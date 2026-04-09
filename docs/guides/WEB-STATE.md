# Web State Management

## Purpose

This guide covers client-side state management using Zustand as an alternative to React Context.

## When to Use Zustand

Use Zustand when you need to access the same data in multiple places (like user data, UI state).

Instead of creating Context providers, use Zustand:

```typescript
// Instead of this:
const UserContext = create<User | null>(null);

// Use this:
const useUserStore = create<{ user: User | null }>()(...)
```

## Location

Stores are located in `apps/web/src/shared/states/`.

## Pattern

```typescript
// apps/web/src/shared/states/useExample.ts
import { create } from "zustand";

type ExampleStore = {
  data: string | null;
  setData: (data: string) => void;
  clearData: () => void;
};

export const useExampleStore = create<ExampleStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  clearData: () => set({ data: null }),
}));
```

## When to Create a Store

Create a Zustand store when:

- Data needs to be accessed in multiple components
- You need simple state management without React Context boilerplate
- Data is client-side only (not from API)

For server-fetched data, use Server Actions or React Query instead.

## Key Files

| File                | Purpose                      |
| ------------------- | ---------------------------- |
| `states/useUser.ts` | User data (see as reference) |

## Reference

See `apps/web/src/shared/states/useUser.ts` for a complete example with persistence.
