/**
 * @type {import('next').NextConfig}
 */

const dev = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    loader: "akamai",
    path: "/public/images",
  },
  assetPrefix: !dev ? "https://oozeqoo.github.io/AVDramaNextJS/public" : "./",
  basePath: !dev ? "/AVDramaNextJS" : "",
};

export default nextConfig;
