import { generateBuckets } from "@/modules/dashboard/helpers/generateBuckets";
import { getStartDate } from "@/modules/dashboard/helpers/getStartDate";
import { db } from "@/shared/lib/db";

type RawRow = { date: string; total: number };

export const findSalesTimeline = async (range: string) => {
  const now = new Date();
  const startDate = getStartDate(range);
  const buckets = generateBuckets(range, now);

  let rows: RawRow[];

  switch (range) {
    case "1D":
      rows = await db.$queryRaw<RawRow[]>`
        SELECT to_char(DATE_TRUNC('hour', "createdAt" AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM-DD HH24:MI:SS') AS date,
               SUM("total")::float AS total
        FROM "orders"
        WHERE "status" IN ('PAID', 'DELIVERED') AND "createdAt" >= ${startDate}
        GROUP BY 1 ORDER BY 1
      `;
      break;
    case "1W":
    case "1M":
      rows = await db.$queryRaw<RawRow[]>`
        SELECT DATE("createdAt" AT TIME ZONE 'America/Sao_Paulo')::text AS date,
               SUM("total")::float AS total
        FROM "orders"
        WHERE "status" IN ('PAID', 'DELIVERED') AND "createdAt" >= ${startDate}
        GROUP BY 1 ORDER BY 1
      `;
      break;
    case "3M":
      rows = await db.$queryRaw<RawRow[]>`
        SELECT to_char(DATE_TRUNC('week', "createdAt" AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM-DD') AS date,
               SUM("total")::float AS total
        FROM "orders"
        WHERE "status" IN ('PAID', 'DELIVERED') AND "createdAt" >= ${startDate}
        GROUP BY 1 ORDER BY 1
      `;
      break;
    case "6M":
      rows = await db.$queryRaw<RawRow[]>`
        SELECT to_char(DATE_TRUNC('month', "createdAt" AT TIME ZONE 'America/Sao_Paulo'), 'YYYY-MM') AS date,
               SUM("total")::float AS total
        FROM "orders"
        WHERE "status" IN ('PAID', 'DELIVERED') AND "createdAt" >= ${startDate}
        GROUP BY 1 ORDER BY 1
      `;
      break;
    default:
      rows = [];
  }

  const grouped = new Map(rows.map((r) => [r.date, r.total]));

  return buckets.map(({ key }) => ({
    date: key,
    total: grouped.get(key) ?? 0,
  }));
};
