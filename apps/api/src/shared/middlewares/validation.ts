import { Request,RequestHandler } from "express";
import z from "zod";

type Property = "body" | "query" | "header" | "params";

type Schemas = Partial<Record<Property, z.ZodTypeAny>>;

type ValidationError = Record<string, object>;

type ValidationReturn<S> = {
  middleware: RequestHandler;
  getValidatedValues: (req: Request) => {
    [K in keyof S]: S[K] extends z.ZodTypeAny ? z.infer<S[K]> : never;
  };
};

const formatErrorsZod = (safeParseError: z.ZodSafeParseError<unknown>) => {
  const tree = z.treeifyError(safeParseError.error);
  const details = ("properties" in tree ? tree.properties : tree) as object;
  return details;
};

export const validation = <S extends Schemas>(schemas: S): ValidationReturn<S> => {
  const middleware: RequestHandler = (req, res, next) => {
    const schemasArray = Object.entries(schemas);
    const errors: ValidationError = {};
    const validatedData: Record<string, unknown> = {};

    for (const [key, schema] of schemasArray) {
      const prop = key as Property;

      const value =
        prop === "header"
          ? Object.fromEntries(
              Object.entries(req.headers).map(([k, v]) => [
                k,
                Array.isArray(v) ? v.join(", ") : (v ?? ""),
              ]),
            )
          : req[prop];

      const result = schema.safeParse(value);

      if (!result.success) {
        errors[prop] = formatErrorsZod(result);
        continue;
      }

      validatedData[key] = result.data;
    }

    const hasErrors = Object.keys(errors).length !== 0;

    if (hasErrors) {
      res.status(400).json({ errors });
      return;
    }

    req.validated = req.validated ?? {};
    Object.assign(req.validated, validatedData);

    next();
  };

  const getValidatedValues = (req: Request) => {
    const output: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

    for (const key of Object.keys(schemas) as (keyof S)[]) {
      output[key] = req.validated?.[key as Property];
    }

    return output as {
      [K in keyof S]: S[K] extends z.ZodTypeAny ? z.infer<S[K]> : never;
    };
  };

  return { middleware, getValidatedValues };
};
