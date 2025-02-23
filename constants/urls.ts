import { devEnv } from "./global";

const env = process.env.VERCEL_ENV;
const vercelUrl = process.env.VERCEL_URL;

export const urls = {
  internal: {
    contributors: "/contributors",
  },
  legal:{
    terms:"https://www.notion.so/ali-hussein/Terms-of-Service-18dbbaf0004f805fa6f1cf3510207a0b",
    privacy:"https://www.notion.so/ali-hussein/Privacy-Policy-18dbbaf0004f805daa4ce6b5b76f9fe7",
  },
  about:"https://www.notion.so/ali-hussein/About-Reactmemo-18dbbaf0004f80c9a502d7a12648098c",
  subscribe: "https://deepreact.substack.com",

  githubPublic: "https://github.com/Ali-Hussein-dev/deepreact",
  myTwitter: "https://x.com/alihussein_20",
};

const hostMap = {
  dev: "http://localhost:3000",
  prod: "https://deepreact.io",
  preview: `https://${vercelUrl}`,
};

export const host = hostMap[env as keyof typeof hostMap];

// const searchParams = {
//     job: {
//       standard: true,
//     },
//   };

export const creemHost = devEnv ? "https://test-api.creem.io" : "https://api.creem.io";

export const creemUrls= {
    checkoutUrl: `${creemHost}/v1/checkouts`,
}