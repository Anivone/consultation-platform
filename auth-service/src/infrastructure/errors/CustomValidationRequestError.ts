import { CustomError, ErrorResponse } from "./CustomError";

export class ValidationRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ErrorResponse) {
    super(400, "Request validation error");
  }

  serializeError(): ErrorResponse {
    return this.errors;
  }
}
