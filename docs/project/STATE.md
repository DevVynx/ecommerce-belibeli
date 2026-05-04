# Project State

**Last Updated**: 2026-04-09
**State Expiration**: N/A

---

## Current Task

**Frontend Refactoring** - Major refactor of the web application:

- Migrating from TanStack Query to Next.js Server Actions
- Implementing new Next.js caching strategies
- UI/UX improvements
- General code quality improvements

---

## Recent Important Decisions

> Decisions older than 30 days are automatically expired and should be removed.

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

---

## Expiration Rules

1. Decisions older than 30 days should be removed
2. When a decision is no longer relevant, archive it
3. Update "Last Updated" date when any change is made
