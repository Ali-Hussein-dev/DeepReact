import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = GeistSans;
const fontMono = GeistMono;

export const metadata: Metadata = {
  title: "DeepReact",
  description: "Search engine for React ecosystem",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased scroll-smooth min-h-svh overscroll-none dark",
          fontSans.variable,
          fontMono.variable
        )}
        style={{ colorScheme: "dark" }}
      >
        <NextTopLoader color="#059669" showSpinner={false} speed={300} />
        {children}
      </body>
    </html>
  );
}
