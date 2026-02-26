/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpError extends Error {
  constructor(
    public status: number,
    public name: string,
    public message: any,
    public code?: string
  ) {
    super(typeof message === "string" ? message : name);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: any, code?: string) {
    super(400, "BadRequestError", message, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: any, code?: string) {
    super(401, "UnauthorizedError", message, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: any, code?: string) {
    super(403, "ForbiddenError", message, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: any, code?: string) {
    super(404, "NotFoundError", message, code);
  }
}

export class ConflictError extends HttpError {
  constructor(message: any, code?: string) {
    super(409, "ConflictError", message, code);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: any, code?: string) {
    super(422, "UnprocessableEntity", message, code);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: any, code?: string) {
    super(500, "InternalServerError", message, code);
  }
}
