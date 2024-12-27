import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/proxy/rss",
        destination: "https://www.infomoney.com.br/feed/",
      },
    ];
  },
};

export default nextConfig;
