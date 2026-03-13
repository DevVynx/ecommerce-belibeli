import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { ENV } from "@/shared/utils/env";

import { PrismaClient } from "../../../prisma/generated/client/client";

const connectionString = `${ENV.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };
