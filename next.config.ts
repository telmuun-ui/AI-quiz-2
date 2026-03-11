import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PRISMA_URL_DATA_BASE: process.env.PRISMA_URL_DATA_BASE,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_KEY: process.env.CLERK_WEBHOOK_KEY,
  },
};

export default nextConfig;
