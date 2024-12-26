/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: (() => {
      const isProduction = process.env.VERCEL_ENV === "production";
      const isPreview = process.env.VERCEL_ENV === "preview";
      return isProduction
        ? "https://services.phloii.com/api/v1/" // Production URL
        : isPreview
        ? "https://dev.phloii.com/api/v1/" // Preview URL
        : "https://dev.phloii.com/api/v1/";    // Development URL
    })(),
  },
};

export default nextConfig;
