import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
	auth: process.env.GITHUB_ACCESS_TOKEN as string,
});

export const getRepoInfo = async (url: string) => {
	const [owner, repo] = url.split("/").slice(-2);
	if (!owner || !repo) return null;
	const res = await octokit.repos.get({ owner, repo: repo });
	return res.data;
};
export const getRepoStarsCount = async (url: string) => {
	const data = await getRepoInfo(url);
	if (data) {
		const stars = data.stargazers_count as number;
		return stars;
	}
	return 0;
};
