export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details: unknown,
  ) {
    super(message);
  }
}

export class BadRequestError extends HttpError {
  constructor(details: unknown) {
    super(400, "BadRequestError", details);
  }
}

export class InternalServerError extends HttpError {
  constructor(details: unknown) {
    super(500, "InternalServerError", details);
  }
}

export class ConflictError extends HttpError {
  constructor(details: unknown) {
    super(409, "ConflictError", details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(details: unknown) {
    super(401, "UnauthorizedError", details);
  }
}

export class ForbiddenError extends HttpError {
  constructor(details: unknown) {
    super(403, "ForbiddenError", details);
  }
}

export class NotFoundError extends HttpError {
  constructor(details: unknown) {
    super(404, "NotFoundError", details);
  }
}
