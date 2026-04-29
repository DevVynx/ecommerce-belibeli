# Relatório de Correções nos Guias (docs/guides/)

**Data**: 2026-04-29  
**Autor**: opencode (big-pickle)  
**Escopo**: Atualização dos guias para refletir o estado atual do código

---

## Resumo Executivo

Foram identificadas e corrigidas discrepâncias entre os guias de documentação e o código atual do projeto. O módulo `shipping` foi ignorado conforme solicitado (será refatorado futuramente). O foco foi alinhar exemplos, nomenclaturas e estruturas de diretórios.

---

## 1. WEB-STATE.md

### Problemas Identificados:
- **Nomenclatura de arquivos**: Guia mostrava `useExample.ts` (com prefixo `use`), mas o código atual usa `auth.ts` e `wishlist.ts` (sem prefixo `use`)
- **Arquivo de referência**: Mencionava `states/useUser.ts` que não existe
- **Exemplo de store**: Mostrava `useExampleStore`, mas o código usa `useAuthState`, `useWishlistState`, `useAuthMutex`
- **Persistência**: Não mencionava o uso de `persist` do zustand/middleware, que é usado em `auth.ts` e `wishlist.ts`

### Correções Aplicadas:
1. Atualizado o exemplo de Pattern para mostrar `auth.ts` com `useAuthState` e uso de `persist`
2. Atualizada a seção **Key Files** para listar `states/auth.ts` e `states/wishlist.ts`
3. Atualizada a seção **Reference** para apontar para `states/auth.ts`

### Antes vs Depois:

**Antes:**
```typescript
// apps/web/src/shared/states/useExample.ts
export const useExampleStore = create<ExampleStore>(...)
```

**Depois:**
```typescript
// apps/web/src/shared/states/auth.ts
export const useAuthState = create<AuthState>()(
  persist(...)
)
```

---

## 2. WEB-COMPONENTS.md

### Problemas Identificados:
- **Diretório `checkout/`**: Mencionado na estrutura como feature, mas não existe no código
- **Estrutura de `store/`**: Guia mostrava como se fosse apenas arquivos, mas o código tem subpastas (`Header/`, `ProductDetailsModal/`, etc.) e arquivos diretos

### Correções Aplicadas:
1. Removida a linha `├── checkout/           # Feature: CheckoutForm, AddressForm, etc.` da estrutura
2. Atualizada a estrutura de `store/` para mostrar que pode ter subpastas:
   ```
   ├── store/              # Feature: Header, ProductCard, CartDrawer, etc.
   │   ├── Header/
   │   ├── ProductCard.tsx
   │   └── ...
   ```

---

## 3. WEB-FORMS.md

### Problemas Identificados:
- **Diretório `checkout/`**: Mencionado na estrutura de schemas, mas não existe `schemas/checkout/`
- **Key Files**: Lista de arquivos estava correta, apenas removida referência visual ao checkout

### Correções Aplicadas:
1. Removida a seção `├── checkout/` da estrutura de schemas:
   ```
   schemas/
   ├── auth/
   │   ├── loginForm.ts
   │   └── registerForm.ts
   └── cep.ts
   ```
2. Mantida a tabela de **Key Files** inalterada (arquivos realmente existem)

---

## 4. API-MODULES.md

### Problemas Identificados:
- **Repositories obrigatórios**: Guia não deixava claro que `repositories/` é obrigatório (o módulo `shipping/` não tem, mas será refatorado)
- **Módulo Shipping**: Estava ausente da seção "Module Examples", mas conforme solicitado, deve ser ignorado
- **Estrutura padrão**: Dizia que `mappers/` era opcional (correto), mas não enfatizava que `repositories/` é obrigatório

### Correções Aplicadas:
1. Atualizada a estrutura padrão para indicar que `repositories/` é **REQUIRED**:
   ```
   ├── repositories/     # Database operations (REQUIRED)
   ```
2. Mantida a indicação de que `mappers/` é opcional
3. Adicionada seção **Wishlist Module** nos exemplos (estava faltando)
4. Removida qualquer menção implícita ao módulo `shipping` como exemplo padrão

### Adição de Exemplo - Wishlist Module:
```
### Wishlist Module

- Controllers: getWishlist, addItem, removeItem
- Services: Wishlist business logic
- Repositories: Wishlist CRUD operations
- Mappers: Transform to response DTOs
```

---

## 5. API-VALIDATION.md

### Status: ✅ Sem alterações necessárias

- O uso de `z.uuid()` está presente tanto no guia quanto no código atual
- Nota: `z.uuid()` não é padrão do Zod v3, parece ser uma extensão personalizada do projeto. Ambos (guia e código) estão consistentes.

---

## 6. Outros Guias (Sem Alterações)

Os seguintes guias foram verificados e estão consistentes com o código atual:

- ✅ **WEB-OVERVIEW.md**: Estrutura correta, arquivos mencionados existem
- ✅ **WEB-DATA-LAYER.md**: Estrutura de Server Actions e React Query correta
- ✅ **API-OVERVIEW.md**: Rotas e estrutura corretas
- ✅ **API-SHARED.md**: Middlewares e utilitários corretos
- ✅ **DATABASE.md**: Cliente Prisma e padrões corretos
- ✅ **SHARED-TYPES.md**: Estrutura de Contracts correta

---

## Arquivos Alterados

| Arquivo | Alterações |
|---------|------------|
| `docs/guides/WEB-STATE.md` | Atualizado exemplo de Pattern, Key Files e Reference |
| `docs/guides/WEB-COMPONENTS.md` | Removido `checkout/`, atualizada estrutura de `store/` |
| `docs/guides/WEB-FORMS.md` | Removido `checkout/` da estrutura de schemas |
| `docs/guides/API-MODULES.md` | Enfatizado que `repositories/` é obrigatório, adicionado exemplo Wishlist |

---

## Verificação de Consistência Pós-Correção

Após as correções, todos os guias agora:
1. ✅ Refletem os nomes reais dos arquivos no código
2. ✅ Mostram a estrutura de diretórios correta
3. ✅ Não mencionam o módulo `shipping` como exemplo
4. ✅ Enfatizam que `repositories/` é obrigatório nas API modules
5. ✅ Incluem informações sobre persistência no Zustand (quando aplicável)

---

## Notas para Desenvolvedores

- O módulo `shipping` deve ser ignorado na documentação até ser refatorado
- Sempre que criar uma nova API module, certifique-se de incluir a pasta `repositories/`
- Stores do Zustand no frontend podem ou não usar `persist` - consulte os arquivos existentes para exemplos
- A extensão `z.uuid()` no Zod é personalizada do projeto e deve ser mantida consistente entre código e documentação

---

**Fim do Relatório**
