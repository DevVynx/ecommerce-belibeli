# Project State

**Last Updated**: 2026-05-22
**State Expiration**: N/A

---

## Current Task

**[vyn-010] Cart Page Refactor** — Backend enrichment refactoring

### Frontend (done)
- Componentized cart page (CartItemCard, CartItemQuantity, CartSummary, etc.)
- LoginModal, coupon input, free shipping progress bar, discount breakdown
- Replaced all `toFixed(2)` with `formatPrice`/`formatDiscount`
- Added `decimal.js` for monetary arithmetic, fixed `calculateSummary` semantics

### Backend (current) — Product Enrichment Refactoring
- **`offer` value object**: Sale price calculations now grouped under `variant.offer` instead of spreading fields. Adding new computed fields (installments, freeShipping, etc.) now only requires touching `PricingInfo` + 1 helper, not N services.
- **Types by domain**: Each module now has a single type file per domain instead of split `Persistence.ts`/`Enriched.ts`:
  - `products/types/ProductList.ts` — Raw + Enriched for catalog listing
  - `products/types/ProductDetail.ts` — Raw + Enriched for product detail
  - `cart/types/Cart.ts` — Raw + Enriched for cart
  - `wishlist/types/Wishlist.ts` — Raw + Enriched for wishlist
- **Consistent NonNullable**: All raw types use `NonNullable` wrapper, no more guessing nullability at import site
- **PascalCase naming**: All type files use PascalCase convention

---

## Recent Important Decisions

> Decisions older than 30 days are automatically expired and should be removed.

### [Task] Product Enrichment Refactoring — Offer Value Object

- **Date**: 2026-05-22
- **Decision**: Replace spread enrichment pattern (`{ ...variant, salePrice, isOnSale, isAvailable }`) with an `offer` value object (`{ ...variant, offer: { salePrice, isOnSale, isAvailable } }`) across all API modules.
- **Why**: Previously, adding a single enrichment field required editing 5 services + 5 type files + helpers. With `offer` namespaced under `variant`, the type is simply `RawVariant & { offer: ProductEnrichment }`, and new fields only touch `ProductEnrichment` + `calculateEnrichment`.
- **Scope**: Products (list/detail), Cart, Wishlist — all enrichment flows updated.
- **Types**: Replaced `Persistence.ts`/`Enriched.ts` split with single files per domain (`ProductList.ts`, `ProductDetail.ts`, `Cart.ts`, `Wishlist.ts`). All raw types use `NonNullable`. PascalCase filenames.

### [Task] Documentation Structure Setup

- **Date**: 2026-04-07 to 2026-04-08
- **Decision**: Created comprehensive AGENTS.md and guide documentation for the codebase
- **Result**: All guides created (API-OVERVIEW, API-MODULES, API-SHARED, API-VALIDATION, DATABASE, SHARED-TYPES, WEB-OVERVIEW, WEB-COMPONENTS, WEB-STATE, WEB-DATA-LAYER)

### [Task] Pragmatic Code Review Skill

- **Date**: 2026-04-09
- **Decision**: Created `pragmatic-code-review` skill for Opencode
- **Features**:
  - Read-only analysis (no code modification)
  - Hierarchical review framework (7 categories)
  - Triage categories: Critical, Improvement, Nit
  - Based on engineering principles (SOLID, DRY, KISS)
- **Location**: `.opencode/skills/pragmatic-code-review/SKILL.md`

### [Task] Pragmatic Commit Skill

- **Date**: 2026-04-09
- **Decision**: Created `pragmatic-commit` skill for Opencode
- **Features**:
  - Stages files before showing plan
  - Scope convention: `api/`, `web/`, or none (both)
  - Body with `-` prefix bullets
  - No footer
  - No breaking changes (!)
- **Location**: `.opencode/skills/pragmatic-commit/SKILL.md`

### [Task] Frontend Architecture Refactor - Remove React Query

- **Date**: 2026-05-04
- **Decision**: Remove React Query completely from the project
- **Changes**:
  - Deleted entire `hooks/data` folder
  - All data operations now use Next.js Server Actions
  - Project no longer uses React Query anywhere
- **Impact**: Major architectural change in data fetching strategy

### [Task] Zustand Over React Context Pattern

- **Date**: 2026-05-04
- **Decision**: Use Zustand for all state management, completely replace React Context
- **Implementation**:
  - Cart store follows Wishlist pattern (both use Zustand)
  - No more React Context in the project
  - Reactive counters in header for both Wishlist and Cart using Zustand stores
- **Impact**: State management standardization across features

### [Task] Optimistic Updates Pattern

- **Date**: 2026-05-04
- **Decision**: Implement Optimistic UI Updates in Zustand stores
- **Pattern**:
  - Update Zustand store before API responds
  - Rollback on API error
  - Used in Cart and Wishlist operations
- **Benefit**: Better UX with immediate feedback

### [Task] Backend Fixes - Variant Mapping & Seed

- **Date**: 2026-05-04
- **Decisions**:
  - Fixed `toProductDetails.ts`: use `productOptionValue.id` instead of `productVariantOption.id`
  - Seed generates all variant combinations automatically via `generateAllVariantCombinations()`
  - `totalStock` calculated automatically as sum of variant stocks
- **Impact**: Correct API responses and proper test data generation

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
