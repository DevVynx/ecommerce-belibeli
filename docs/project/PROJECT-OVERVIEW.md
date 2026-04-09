# Project Overview

## What is BeliBeli?

BeliBeli is a **modern e-commerce platform** designed to simulate a full-featured online store. It's a personal portfolio project focused on demonstrating full-stack development proficiency with a modern tech stack.

**Core Goal**: Build a complete, production-ready e-commerce experience with excellent UX and clean architecture.

---

## Project Type

- **Category**: E-commerce simulation / Portfolio project
- **Language**: TypeScript (monorepo)
- **Package Manager**: pnpm (workspace)
- **Build Tool**: Turbo

---

## Main Features

### Implemented

| Feature            | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| **Authentication** | Multi-step registration, login, JWT + Refresh tokens, Google OAuth   |
| **Products**       | Catalog browsing, product details, variants (size, color), filtering |
| **Cart**           | Add/remove items, quantity management, persistence                   |
| **Wishlist**       | Save products for later                                              |
| **Shipping**       | CEP-based shipping quotes                                            |
| **Responsive UI**  | Mobile-first, works on all devices                                   |

### Planned

- Checkout flow
- Order management
- Coupon system
- Payment integration
- User profile/settings
- Admin panel

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Monorepo Structure                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐         ┌─────────────┐             │
│   │   apps/api  │         │  apps/web   │             │
│   │             │         │             │             │
│   │  Express.js │  ←──→   │  Next.js 16 │             │
│   │  REST API   │         │  App Router │             │
│   │  Prisma ORM │         │             │             │
│   └──────┬──────┘         └──────┬──────┘             │
│          │                        │                     │
│          └──────────┬─────────────┘                     │
│                     ↓                                   │
│            ┌───────────────┐                           │
│            │ packages/types │                           │
│            │   (shared)    │                           │
│            └───────────────┘                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### API (apps/api)

- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT access tokens + HTTP-only refresh tokens
- **Pattern**: controllers → services → repositories

### Web (apps/web)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Data Fetching**: Mix of Server Actions + React Query
- **State**: Zustand (UI state), React Query (server state)
- **Forms**: React Hook Form + Zod

---

## Data Models

```
User
  ├── RefreshToken
  ├── Cart ─── CartItem ─── ProductVariant
  ├── Wishlist ─── WishlistItem ─── Product
  └── Order ─── OrderItem ─── ProductVariant
        └── CouponUsage ─── Coupon

Product
  ├── Category
  ├── ProductOption (size, color, etc)
  │     └── ProductOptionValue
  ├── ProductVariant (SKU, price, stock)
  │     └── ProductVariantOption
  └── Promotion
```

---

## Important Notes

1. **Portfolio Project**: This is a personal project to showcase skills, not a production commercial application.

2. **In Active Development**: New features and refactoring are added regularly.

3. **Type Safety First**: Strict TypeScript, Zod validation on both client and server.

4. **Clean Architecture**: Separation of concerns with repository pattern in API and modular structure.

5. **API Contract**: Types are shared between API and Web via `@repo/types` package to ensure consistency.

---

## Tech Stack Summary

| Layer           | Technology            |
| --------------- | --------------------- |
| Language        | TypeScript            |
| Web Framework   | Next.js 16            |
| API Framework   | Express.js            |
| Database        | PostgreSQL            |
| ORM             | Prisma                |
| Styling         | Tailwind CSS          |
| Data (client)   | React Query + Zustand |
| Data (server)   | Server Actions        |
| Validation      | Zod                   |
| Package Manager | pnpm                  |
| Build Tool      | Turbo                 |
