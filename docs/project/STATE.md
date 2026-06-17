# Project State

**Last Updated**: 2026-06-17
**State Expiration**: N/A

---

## Current Task

**[vyn-050] Corrigir ratings: API retorna valores individuais em vez de únicos** — Completed

### Changes
- **`facetProcessor.ts`**: RatingOptions agora agrupa por `Math.floor(value)` antes de cumular. Ex: valores 1.9, 2.1, 2.2, 2.6 viram {1, 2, 2, 2} e são somados por grupo.

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
