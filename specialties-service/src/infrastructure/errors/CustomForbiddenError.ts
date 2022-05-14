import { CustomError, ErrorResponse } from "./CustomError";

export class CustomForbiddenError extends CustomError {
    statusCode: number = 403;

    constructor() {
        super("Forbidden Error");
        Object.setPrototypeOf(this, CustomForbiddenError.prototype);
    }

    serializeError(): ErrorResponse {
        return [{ message: "Access forbidden" }];
    }

}