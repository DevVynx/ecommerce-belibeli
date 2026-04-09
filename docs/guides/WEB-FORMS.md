# Web Forms

## Purpose

This guide covers form handling patterns using React Hook Form with Zod validation in the web app.

## When to Use React Hook Form

Use React Hook Form for:

- **Form-heavy pages** - Login, register, checkout, profile edit
- **Complex validation** - Multi-field validation, conditional rules, cross-field validation
- **Multi-step forms** - Stepper wizards with field-level validation

For simple interactions (search, filters), use controlled components with state.

## Schema Pattern

Zod schemas are defined in `apps/web/src/shared/schemas/` and organized **by feature**:

```
schemas/
├── auth/
│   ├── loginForm.ts
│   └── registerForm.ts
├── checkout/
│   └── addressForm.ts
└── cep.ts
```

For type contracts between API and Web, see @docs/guides/SHARED-TYPES.md.

### Schema Definition

```typescript
// apps/web/src/shared/schemas/auth/loginForm.ts
import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido.").min(1, "O e-mail é obrigatório."),
  password: z
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .regex(/\d/, "A senha deve conter pelo menos um número."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

For complex forms, use nested objects with `refine` for cross-field validation:

```typescript
// apps/web/src/shared/schemas/auth/registerForm.ts
export const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("E-mail inválido.").min(1, "O e-mail é obrigatório."),
  password: z
    .object({
      password: z
        .string()
        .min(6, "A senha precisa ter pelo menos 6 caracteres."),
      confirmPassword: z.string().min(1, "Confirme a sua senha."),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ["confirmPassword"],
      message: "As senhas não coincidem",
    }),
});
```

## Form Component Pattern

### Basic Form

```typescript
// apps/web/src/shared/components/auth/login/LoginForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/shared/actions/auth/login";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import { Spinner } from "@/shared/components/shadcn-ui/spinner";
import { type LoginFormData, loginSchema } from "@/shared/schemas/auth/loginForm";

export const LoginForm = ({ redirectTo = "/" }: { redirectTo?: string }) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    const { data: result, error } = await login(data);
    // handle result or error
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input {...form.register("email")} id="email" />
        {form.formState.errors.email && (
          <FieldError errors={[form.formState.errors.email]} />
        )}
      </Field>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <Spinner /> : "Entrar"}
      </Button>
    </form>
  );
};
```

### Using Controller

For controlled components (custom inputs, checkboxes), use `Controller`:

```typescript
import { Controller } from "react-hook-form";

// Checkbox example
<Controller
  name="rememberMe"
  control={form.control}
  render={({ field }) => (
    <Checkbox
      checked={field.value}
      onCheckedChange={(v) => field.onChange(!!v)}
    />
  )}
/>

// Custom input example
<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <Input {...field} />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

## Error Handling

Zod validation errors are automatically mapped to React Hook Form errors via `zodResolver`.

### Field-Level Errors

Display errors using the `FieldError` component:

```typescript
{form.formState.errors.email && (
  <FieldError errors={[form.formState.errors.email]} />
)}
```

### Form-Level Errors

For API errors that don't map to specific fields:

```typescript
const [apiError, setApiError] = useState<string | null>(null);

const onSubmit = async (data: LoginFormData) => {
  const { error } = await login(data);
  if (error) {
    setApiError(error.message);
    return;
  }
};

// Display
{apiError && <ErrorNotification message={apiError} onCloseAction={() => setApiError(null)} />}
```

## Server Actions with Forms

Forms use Server Actions for submission. See @docs/guides/WEB-DATA-LAYER.md for the Server Action pattern.

```typescript
import { login } from "@/shared/actions/auth/login";

const onSubmit = async (data: LoginFormData) => {
  const { data: result, error } = await login(data);
  if (error) {
    // handle error
  }
  // redirect or update UI
};
```

### Progressive Enhancement

React Hook Form works with Server Actions for progressive enhancement:

- JavaScript loads: Form submits via AJAX, validation runs client-side
- JavaScript disabled: Form submits traditionally, validation runs server-side

Ensure Server Actions accept the same data shape as the Zod schema.

## Key Files

| File                                        | Purpose                 |
| ------------------------------------------- | ----------------------- |
| `schemas/auth/loginForm.ts`                 | Login Zod schema        |
| `schemas/auth/registerForm.ts`              | Register Zod schema     |
| `components/auth/login/LoginForm.tsx`       | Login form component    |
| `components/auth/register/RegisterForm.tsx` | Register form component |

## Related Guides

- @docs/guides/WEB-DATA-LAYER.md - Server Actions for form submission
- @docs/guides/WEB-COMPONENTS.md - Component patterns and shadcn-ui
- @docs/guides/SHARED-TYPES.md - Type contracts between API and Web
