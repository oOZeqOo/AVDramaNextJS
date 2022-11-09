/**
 * @type {import('next').NextConfig}
 */

 const isGithubActions = process.env.GITHUB_ACTIONS || false;
 const repo = "/AVDramaNextJS";
 let assetPrefix = "";
 let basePath = "/";

 if (isGithubActions) {
   // trim off `<owner>/`
   const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

   assetPrefix = `/${repo}`;
   basePath = `/${repo}`;
 }

 const nextConfig = {
   images: {
     loader: "akamai",
     path: basePath,
   },
   assetPrefix: assetPrefix,
   basePath: basePath,
 };

export default nextConfig;
