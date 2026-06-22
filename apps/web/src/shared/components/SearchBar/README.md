# SearchBar

Componente de busca reutilizável com input + dropdown de sugestões. Desktop: dropdown abaixo do input. Mobile: tela cheia com overlay.

## Uso Básico

```tsx
import { SearchBar } from "@/shared/components/SearchBar";

<SearchBar
  fetchSuggestions={async (q) => [
    { id: "1", term: `${q} barato` },
    { id: "2", term: `${q} promoção` },
  ]}
  fetchTrending={async () => [
    { id: "1", term: "televisao" },
    { id: "2", term: "iphone" },
  ]}
  onSelect={(term) => router.push(`/search?q=${encodeURIComponent(term)}`)}
/>;
```

## Props

### Comportamento

- **`fetchSuggestions`** `(q: string) => Promise<SearchSuggestion[]>` (obrigatório) — Chamado com debounce (300ms) enquanto o usuário digita.
- **`fetchTrending`** `() => Promise<SearchSuggestion[]>` (opcional) — Chamado ao abrir o dropdown. Retorna os termos mais buscados.
- **`onSelect`** `(term: string) => void` (obrigatório) — Chamado ao selecionar um item ou pressionar Enter.
- **`mobileTrigger`** `"input" | "icon"` (opcional, default: `"input"`) — `"input"`: input visível em mobile; `"icon"`: só ícone de lupa.

### Aparência

- **`classNames`** `SearchBarClassNames` (opcional) — Objeto com classes Tailwind para customizar partes do componente.
- **`placeholder`** `string` (opcional, default: `"Busque os seus produtos."`) — Placeholder do input.

### Dados

- **`queryFromUrl`** `string` (opcional) — Sincroniza o input com o valor da URL quando o dropdown está fechado. O pai extrai via `useSearchParams()`.

### Limites

- **`maxRecentSearches`** (default: `5`) — Máximo de termos salvos no `localStorage`.
- **`maxSuggestions`** (default: `10`) — Máximo de sugestões por `fetchSuggestions`.
- **`maxTrending`** (default: `5`) — Máximo de itens de tendências exibidos.

### SearchSuggestion

```ts
type SearchSuggestion = {
  id: string;
  term: string;
};
```

## Personalização com classNames

```tsx
<SearchBar
  classNames={{
    root: "w-full max-w-md",
    input: "border-2 border-blue-500 rounded-full",
    section: "border-b last:border-b-0",
    sectionTitle: "text-blue-600 text-xs uppercase",
    item: "hover:bg-blue-50",
    itemIcon: "text-blue-400",
    itemText: "font-medium",
    trigger: "text-blue-500",
    closeButton: "text-blue-600",
    searchButton: "text-blue-500",
  }}
/>
```

### SearchBarClassNames

- **`root`** — Container externo
- **`trigger`** — Botão de lupa no mobile (modo `icon`)
- **`input`** — Campo de input
- **`section`** — Seção do dropdown (Últimas buscas, Tendências, Sugestões)
- **`sectionTitle`** — Título da seção
- **`item`** — Item clicável da lista
- **`itemIcon`** — Ícone do item
- **`itemText`** — Texto do termo
- **`closeButton`** — Botão "Cancelar" no mobile
- **`searchButton`** — Botão de busca ao lado do input

## Comportamento

### Estados

- **Fechado** — Desktop: Input visível. Mobile: Input ou ícone (depende de `mobileTrigger`).
- **Aberto sem query** — Desktop: Dropdown abaixo do input + overlay. Mobile: Tela cheia com input focado + lista.
- **Digitando** — Desktop: Dropdown com sugestões. Mobile: Tela cheia com sugestões.
- **Item selecionado** — Desktop: Fecha e chama `onSelect(term)`. Mobile: Fecha e chama `onSelect(term)`.

### Seções do dropdown

- **Últimas buscas** — Dropdown aberto + input vazio. Origem: `localStorage` (chave `recent_searches`).
- **Tendências** — Dropdown aberto + input vazio. Origem: `fetchTrending()`.
- **Sugestões** — Digitando + fetch concluído. Origem: `fetchSuggestions(query)`.

### Atalhos de teclado

- **`ArrowDown`** — Próximo item
- **`ArrowUp`** — Item anterior
- **`Enter`** — Seleciona o item destacado; se nenhum, usa o valor digitado
- **`Escape`** — Fecha o dropdown

## Componentes internos

O SearchBar é composto por submódulos que podem ser usados independentemente:

- **`SearchBarInput`** — Input com botão de busca lateral. Aceita `ref` via `forwardRef`.
- **`SearchBarItem`** — Item da lista com ícone, texto (com `highlightQuery` para destacar), clique e botão de remover.
- **`SearchBarSection`** — Container para agrupar itens com título opcional.
- **`SearchResults`** — Renderiza a lista completa (sugestões / recentes + tendências / vazio) baseada no estado.
- **`HighlightedText`** — Destaca o trecho digitado (cinza claro) do resto (negrito preto).

### hooks

- **`useSearchBar`** — Hook principal: estado, fetching, teclado, overlay.
- **`useSearchStorage`** — Gerencia `localStorage` para últimas buscas (`loadRecentFromStorage`, `addToRecent`, `removeRecentSearch`).

## Exemplos de Implementação

### Com Meilisearch

```tsx
import { Meilisearch } from "meilisearch";

const meili = new Meilisearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST!,
  apiKey: process.env.NEXT_PUBLIC_MEILI_SEARCH_KEY!,
});

<SearchBar
  fetchSuggestions={async (query) => {
    const { hits } = await meili.index("suggestions").search(query, { limit: 10 });
    return hits.map((hit) => ({ id: String(hit.id), term: String(hit.term) }));
  }}
  fetchTrending={async () => {
    const { hits } = await meili.index("suggestions").search("", {
      sort: ["searchCount:desc"],
      limit: 5,
    });
    return hits.map((hit) => ({ id: String(hit.id), term: String(hit.term) }));
  }}
  onSelect={(term) => router.push(`/search?q=${encodeURIComponent(term)}`)}
/>;
```

### Com API própria

```tsx
<SearchBar
  fetchSuggestions={async (query) => {
    const res = await fetch(`/api/suggestions?q=${query}`);
    const { suggestions } = await res.json();
    return suggestions;
  }}
  fetchTrending={async () => {
    const res = await fetch("/api/trending");
    const { trending } = await res.json();
    return trending;
  }}
  onSelect={(term) => navigate(`/search?q=${encodeURIComponent(term)}`)}
/>
```

### Dados mockados

```tsx
<SearchBar
  fetchSuggestions={async (query) =>
    Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      term: `${query} sugestão ${i + 1}`,
    }))
  }
  fetchTrending={async () => [
    { id: "1", term: "televisao" },
    { id: "2", term: "iphone 16" },
    { id: "3", term: "fone de ouvido" },
  ]}
  onSelect={(term) => console.log("Buscou:", term)}
/>
```

## Notas Técnicas

- `"use client"` — estado, eventos e `localStorage`.
- `localStorage` salva os últimos termos em `recent_searches` (array JSON).
- Debounce de 300ms.
- O dropdown usa `createPortal` para `document.body` para evitar conflitos de z-index com o header fixo.
- Mobile detectado via `useScreenSize` (breakpoint 1024px).
- Layout mobile: overlay preto + tela cheia branca com input fixo no topo e lista rolável.
