import "dotenv/config";

import { Meilisearch } from "meilisearch";

const MEILI_HOST = process.env.MEILI_HOST ?? "http://localhost:7700";
const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY ?? "";

const client = new Meilisearch({ host: MEILI_HOST, apiKey: MEILI_MASTER_KEY });

async function main() {
  console.log("Configurando indices do Meilisearch...\n");

  const { results: existingIndexes } = await client.getIndexes();
  const indexUids = existingIndexes.map((index) => index.uid);

  if (!indexUids.includes("suggestions")) {
    await client.createIndex("suggestions", { primaryKey: "id" });
  }

  await client.index("suggestions").updateSortableAttributes(["searchCount"]);

  await client
    .index("suggestions")
    .updateRankingRules(["words", "typo", "sort", "proximity", "attribute", "exactness"]);

  console.log("Index 'suggestions' configurado com sucesso!");
}

main().catch((error) => {
  console.error("Erro no setup:", error);
  process.exit(1);
});
