/**
 * @type {import('next').NextConfig}
 */

 const debug = process.env.NODE_ENV === "dev";
 const nextConfig = {
   images: {
     loader: "akamai",
     path: "",
   },
   assetPrefix: debug ? "https://oozeqoo.github.io/AVDramaNextJS/" : "./",
 };

export default nextConfig;
