/**
 * @type {import('next').NextConfig}
 */

const dev = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    loader: "akamai",
    path: !dev ? "/AVDramaNextJS/" : "",
  },
  assetPrefix: !dev ? "https://oozeqoo.github.io/AVDramaNextJS/" : "./",
  basePath: !dev ? "/AVDramaNextJS/" : "",
};

export default nextConfig;
