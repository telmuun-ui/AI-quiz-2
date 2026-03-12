import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
const adapter = new PrismaPg({
  connectionString: process.env.PRISMA_URL_DATA_BASE,
});
const prisma = new PrismaClient({
  adapter,
});
export default prisma;
