import { CustomError, ErrorResponse } from "./CustomError";

export class CustomBadRequestError extends CustomError {
  statusCode: number = 400;
  message: string;

  constructor(message?: string) {
    super(message);
    this.message = message || "Bad Request error occurred";
    Object.setPrototypeOf(this, CustomBadRequestError.prototype);
  }

  serializeError(): ErrorResponse {
    return [{ message: this.message }];
  }
}
