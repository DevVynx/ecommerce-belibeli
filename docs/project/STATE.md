# Project State

**Last Updated**: 2026-06-16
**State Expiration**: N/A

---

## Current Task

**[vyn-012] Full-Text Search with Meilisearch** — Completed

### Changes
- **Docker Compose**: Meilisearch service (`getmeili/meilisearch:v1.37`) added to `compose.yaml`
- **`.env.example` / `env.ts`**: Added `MEILI_HOST` and `MEILI_MASTER_KEY` configuration
- **`prisma/sync-search.ts`**: Idempotent sync script — deletes all then re-adds products to Meili index with enrichment
- **`infra/search/`**: Created `SearchEngine` interface + `MeilisearchAdapter` implementation + singleton export — abstraction layer for swappable search engines
- **`repositories/findByIds.ts`**: Fetches products by ID array, reorders to match Meili relevance using `Map`
- **`repositories/findMany.ts`**: Uses `$transaction` for atomic `findMany` + `count`
- **`services/searchProducts.ts`**: Orchestrates Meili → Prisma → enrichment → pagination (`total`, `hasMore`)
- **`services/findMany.ts`**: Now returns `{ enrichedProducts, pagination: { total, hasMore } }` (calculation moved from controller)
- **`controllers/searchProducts.ts`**: Returns `{ products, filters: [], pagination }`
- **`controllers/getProducts.ts`**: Consumes `pagination` from service directly
- **`routes.ts`**: `GET /products/search` registered before `:productId` to avoid route conflict
- **`helpers/validators/searchProducts.ts`**: Zod schema for search query params
- **`helpers/validators/getAll.ts`**: Fixed `offset` from `.positive()` to `.nonnegative()`
- **`mappers/toCatalogSummary.ts`**: Decoupled from `GetProductsResponse` — returns `{ products }` only
- **`types/ProductList.ts`**: `RawProductList` updated for new return shape
- **`packages/types/Contracts/Products/Responses.ts`**: Pagination simplified to `{ total, hasMore }`
- **`packages/types/Contracts/Reviews/Responses.ts`**: Same pagination simplification
- **`meilisearch` SDK (`^0.58.0`)** installed
- **`pnpm --filter api db:sync-search`** script registered

### Motivation
- Add full-text search with typo tolerance, filtering, and relevance ranking
- Abstract search engine behind interface (`SearchEngine`) — swap Meilisearch without changing module code
- Hybrid approach: Meili returns IDs → Prisma fetches full data with runtime enrichment (promotions, stock)
- Only index fields needed for search + filtering (`id`, `title`, `description`, `price`, `salePrice`, `categoryId`, `categoryName`, `skus`, `ratingRate`, `ratingCount`, `createdAt`)

---

## Recent Important Decisions

> Decisions older than 30 days are automatically expired and should be removed.

### [Task] Meilisearch Full-Text Search

- **Date**: 2026-06-16
- **Decision**: Implemented full-text search using Meilisearch with an abstraction layer (`SearchEngine` interface in `infra/search/`) so the engine can be swapped without changing module code.
- **Architecture**:
  - Hybrid approach: Meili returns IDs → Prisma fetches full data with runtime enrichment (promotions, stock)
  - Only index fields needed for search + filtering — no `image`/`slug`/`totalStock` in index
  - Search endpoint lives inside `modules/products/` (returns `CatalogProductDto`), not a separate module
  - `searchableAttributes`: title, description, categoryName, skus
  - `filterableAttributes`: categoryId, price, salePrice, categoryName
  - `sortableAttributes`: salePrice, ratingRate, createdAt
- **Pagination**: Response simplified to `{ total, hasMore }` (offset-based, frontend manages offset state)
  - `hasMore` calculated in service layer, not controller
  - `$transaction` in repository ensures atomic `findMany` + `count`
  - Prisma `findMany` with `in: ids` does NOT preserve order — `findByIds` reorders via `Map` to match Meili relevance
- **`onSale` filter**: Uses `salePrice < price` (both fields indexed)
- **Sync**: `prisma/sync-search.ts` — manual script (idempotent: deletes all then re-adds), `pnpm --filter api db:sync-search`
- **Key difference**: `MEILI_HOST` differs by context — API (Docker) uses `http://meilisearch:7700`, sync script (local) uses `http://localhost:7700`

### [Task] Product Enrichment Refactoring — Offer Value Object

- **Date**: 2026-05-22
- **Decision**: Replace spread enrichment pattern (`{ ...variant, salePrice, isOnSale, isAvailable }`) with an `offer` value object (`{ ...variant, offer: { salePrice, isOnSale, isAvailable } }`) across all API modules.
- **Why**: Previously, adding a single enrichment field required editing 5 services + 5 type files + helpers. With `offer` namespaced under `variant`, the type is simply `RawVariant & { offer: ProductEnrichment }`, and new fields only touch `ProductEnrichment` + `calculateEnrichment`.
- **Scope**: Products (list/detail), Cart, Wishlist — all enrichment flows updated.
- **Types**: Replaced `Persistence.ts`/`Enriched.ts` split with single files per domain (`ProductList.ts`, `ProductDetail.ts`, `Cart.ts`, `Wishlist.ts`). All raw types use `NonNullable`. PascalCase filenames.

### [Task] Decimal.js for Monetary Arithmetic

- **Date**: 2026-05-20
- **Decision**: Added `decimal.js` for all monetary calculations on the frontend
- **Why**: JavaScript `number` (IEEE 754) causes precision errors (e.g., `19.99 * 3 = 59.970000000000006`). Money must never be calculated with floats.
- **Created utility**: `@/shared/utils/store/price.ts` with `asDecimal()`, `formatPrice()`, `formatDiscount()`, `calculateDiscountPercent()`
- **Impact**: All price displays now use `formatPrice()`, all arithmetic uses `Decimal` internally via `calculateSummary()` and `CouponApplier`

### [Task] Fixed Cart Summary Semantics

- **Date**: 2026-05-20
- **Decision**: Fixed `calculateSummary` in Zustand cart store to match API behavior
- **Semantics** (before → after):
  - `subtotal`: was `Σ(salePrice)` (discounted) → now `Σ(price)` (base, matches API)
  - `total`: was `subtotal` (copy) → now `Σ(salePrice)` (effective, matches API)
  - `discount`: `retailPrice - effectivePrice` (same as before, now computed via `Decimal`)
- **Impact**: `CartSummary.tsx`, `CartDropdown.tsx`, `CartMobileSummaryDrawer.tsx` all now show correct values. Free shipping threshold uses `total` (effective price).

---

## Expiration Rules

1. Decisions older than 30 days should be removed
2. When a decision is no longer relevant, archive it
3. Update "Last Updated" date when any change is made
