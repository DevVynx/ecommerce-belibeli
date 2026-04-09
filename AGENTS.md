## Agentic Coding Guidelines for E-commerce BeliBeli

**IMPORTANT: Read this entire file before starting any task.**

**ALWAYS read `@docs/project/STATE.md` first** to check the current project state, active task, and recent decisions. Update the state file if the task context changes.

---

## Project Overview

This is a TypeScript monorepo (pnpm workspace + Turbo) containing:

- **apps/api**: Express.js REST API with Prisma ORM and PostgreSQL
- **apps/web**: Next.js 16 (App Router) frontend
- **packages/**: Shared configs and types (@repo/types)

**Stack**: TypeScript, Express, Next.js 16, Prisma, PostgreSQL, React Query, Zustand, Tailwind CSS

For more details about the project, see @docs/project/PROJECT-OVERVIEW.md

---

## CRITICAL: Use Subagents Aggressively

**Use subagents as much as possible.** When a task can be parallelized or delegated:

- Use `@explore` for codebase exploration and research
- Use `@general` for multi-step tasks and research
- Suggest creating custom subagents for repetitive workflows (ask the user first)
- Never do sequentially what can be done in parallel

This maximizes efficiency and keeps the main agent focused on coordination.

---

## CRITICAL: On-Demand Guide Loading

This repository has detailed guides in `@docs/guides/` for specific topics. You should only load these guides **when they are relevant to the task you are performing**.

### When to Load a Guide

- **Load a guide ONLY when you need information from it** to complete the user's request
- **Do NOT load a guide** just because it exists or might be related
- **Do NOT load all guides** at the start of a session
- **Load guides based on the actual task at hand**

Example:

- User asks to add a new API endpoint → Load API-MODULES.md and API-SHARED.md
- User asks to fix a CSS bug on a button → No guide needed, just fix the CSS
- User asks to add a new React Query mutation → Load WEB-DATA-LAYER.md

### How to Load Guides

When you see a reference like `@docs/guides/API-OVERVIEW.md` or need information from a specific topic, use the Read tool:

```
Read tool → filePath: "C:\Code\Projetos-FullStack\ecommerce-belibeli\docs\guides\API-OVERVIEW.md"
```

### Recursive Loading

If a loaded guide references another guide for deeper details, load that guide too.

---

## CRITICAL: Always Ask Before Making Decisions

**STOP AND ASK when you encounter anything that would require a guess.**

If at any point you need to make a decision that isn't clearly documented:

- Missing business rule
- Contradictory behavior
- Undocumented architecture decision
- Ambiguous requirement
- Naming convention not specified
- Pattern or approach not covered

**You MUST stop, make no assumptions, and ask the user directly.**

Do not proceed until you receive explicit confirmation. It is better to ask ten unnecessary questions than to make one wrong assumption.

---

## Quick Reference

### Build Commands

```bash
pnpm build          # Build all packages
pnpm dev            # Start all apps
pnpm lint           # Lint all packages
pnpm lint:fix       # Auto-fix linting
pnpm check-types    # Type check all packages

# Single package
pnpm --filter api dev
pnpm --filter web dev
pnpm --filter api db:seed
```

---

## Essential Principles

These principles **MUST** be followed in every task, regardless of context:

1. **No `any`** - Never use `any`. If really need it, use `unknown` and narrow appropriately.
2. **Strict Mode** - Always follow TypeScript strict mode rules.
3. **`type` over `interface`** - Prefer `type` for object shapes, except when interface is required.
4. **Zod validation** - Validate all inputs with Zod on both API and Web.

---

## Deep-Dive Guides

### API Guides

- **@docs/guides/API-OVERVIEW.md** - Server setup, middleware, routing, error handling
- **@docs/guides/API-MODULES.md** - Module pattern, auth, cart, wishlist, products, shipping
- **@docs/guides/API-SHARED.md** - HttpErrors, middlewares, validation, auth utilities
- **@docs/guides/API-VALIDATION.md** - Zod validation patterns
- **@docs/guides/DATABASE.md** - Prisma schema, models, migrations, queries

### Web Guides

- **@docs/guides/WEB-OVERVIEW.md** - Next.js structure, routing, layouts
- **@docs/guides/WEB-COMPONENTS.md** - Radix UI, shadcn-ui, component patterns
- **@docs/guides/WEB-DATA-LAYER.md** - React Query hooks, mutations, query keys
- **@docs/guides/WEB-STATE.md** - Zustand stores, when to use vs React Query

### Shared Guides

- **@docs/guides/SHARED-TYPES.md** - @repo/types contracts between API and Web

---

## Essential Reading by Task

| Task                  | Load These Guides                       |
| --------------------- | --------------------------------------- |
| API development       | API-OVERVIEW, API-MODULES, DATABASE     |
| Adding new API module | API-MODULES, API-SHARED, API-VALIDATION |
| Database changes      | DATABASE, API-SHARED                    |
| Web UI components     | WEB-OVERVIEW, WEB-COMPONENTS            |
| Data fetching         | WEB-DATA-LAYER, WEB-STATE               |

| API/Web integration | SHARED-TYPES, WEB-DATA-LAYER |

---

## Key File Locations

```
apps/api/src/
├── app.ts                  # Express setup
├── server.ts               # Entry point
├── modules/{feature}/      # Feature modules
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes.ts
│   └── types/
└── shared/
    ├── middlewares/
    └── utils/

apps/web/src/
├── app/                    # Next.js pages
│   ├── (public)/
│   └── (private)/
└── shared/
    ├── actions/            # Server actions (by feature)
    ├── components/         # React components (by feature)
    │   └── shadcn-ui/      # Base UI components
    ├── hooks/              # React hooks
    │   └── data/           # React Query hooks
    ├── schemas/             # Zod schemas (by feature)
    ├── states/              # Zustand stores
    ├── providers/          # Context providers
    ├── contexts/            # React contexts
    └── utils/               # Utility functions

packages/types/src/Contracts/  # Shared API types
```
