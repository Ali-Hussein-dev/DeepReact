import { createServerFn } from "@tanstack/react-start";
import * as cheerio from "cheerio";

export const scrapeWebsiteMetadata = async (rawUrl: string) => {
	// Basic URL normalization and protocol check
	let inputUrl: URL;
	try {
		inputUrl = new URL(rawUrl);
		if (!["http:", "https:"].includes(inputUrl.protocol)) {
			throw new Error("Unsupported URL protocol");
		}
	} catch {
		throw new Error("Invalid URL");
	}

	// Block obvious unsafe hosts (best-effort in edge/runtime without DNS resolution)
	const hostname = inputUrl.hostname.toLowerCase();
	const blockedHosts = new Set(["localhost", "127.0.0.1", "::1"]);
	if (
		blockedHosts.has(hostname) ||
		hostname.startsWith("10.") ||
		hostname.startsWith("192.168.") ||
		hostname.startsWith("169.254.") ||
		/^(172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname)
	) {
		throw new Error("Blocked host");
	}

	// Timeout wrapper for fetch
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);
	let response: Response;
	try {
		response = await fetch(inputUrl.toString(), {
			redirect: "follow",
			signal: controller.signal,
			headers: { "User-Agent": "MetadataFetcher/1.0" },
		});
	} finally {
		clearTimeout(timeout);
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch URL: ${response.status}`);
	}

	// Ensure content type is HTML
	const contentType = response.headers.get("content-type") || "";
	if (!contentType.includes("text/html")) {
		throw new Error("URL did not return HTML content");
	}

	const html = await response.text();
	const $ = cheerio.load(html);

	// Determine base URL for resolving relative/protocol-relative assets
	const baseTag = $("base[href]").attr("href") || "";
	const effectivePageUrl = new URL(response.url || inputUrl.toString());
	let baseForResolve: URL;
	try {
		baseForResolve = new URL(baseTag, effectivePageUrl);
	} catch {
		baseForResolve = effectivePageUrl;
	}
	const resolveAsset = (value?: string | null) => {
		if (!value) return undefined;
		try {
			return new URL(value, baseForResolve).toString();
		} catch {
			return undefined;
		}
	};

	const title = `${$("title").first().text()}`.trim() || undefined;
	const description =
		(
			$('meta[name="description"]').attr("content") ||
			$('meta[property="og:description"]').attr("content") ||
			$("meta[name='twitter:description']").attr("content") ||
			""
		).trim() || undefined;

	const ogImageRaw =
		$('meta[property="og:image:secure_url"]').attr("content") ||
		$('meta[property="og:image"]').attr("content") ||
		$("meta[name='twitter:image']").attr("content") ||
		undefined;
	const og_image_url = resolveAsset(ogImageRaw);

	// Try common icon locations for logo fallback
	const iconRaw =
		$('link[rel~="icon"]').attr("href") ||
		$('link[rel="shortcut icon"]').attr("href") ||
		$('link[rel="apple-touch-icon"]').attr("href") ||
		undefined;
	const logo_url = resolveAsset(iconRaw) || og_image_url;

	return { title, description, og_image_url, logo_url };
};

//------------------------------------------------------------
export const getWebsiteMetadata = createServerFn({ method: "GET" })
	.inputValidator((data: { url: string }) => {
		if (!data || typeof data.url !== "string") {
			throw new Error("Missing URL");
		}
		let parsed: URL;
		try {
			parsed = new URL(data.url);
		} catch {
			throw new Error("Invalid URL");
		}
		if (!["http:", "https:"].includes(parsed.protocol)) {
			throw new Error("Unsupported URL protocol");
		}
		const hostname = parsed.hostname.toLowerCase();
		const blockedHosts = new Set(["localhost", "127.0.0.1", "::1"]);
		if (
			blockedHosts.has(hostname) ||
			hostname.startsWith("10.") ||
			hostname.startsWith("192.168.") ||
			hostname.startsWith("169.254.") ||
			/^(172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname)
		) {
			throw new Error("Blocked host");
		}
		return { url: parsed.toString() };
	})
	.handler(async ({ data }) => {
		return scrapeWebsiteMetadata(data.url);
	});
