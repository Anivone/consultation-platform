import { CustomError, ErrorResponse } from "./CustomError";

export class CustomValidationRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ErrorResponse) {
    super("Request validation error");
    Object.setPrototypeOf(this, CustomValidationRequestError.prototype);
  }

  serializeError(): ErrorResponse {
    return this.errors;
  }
}
