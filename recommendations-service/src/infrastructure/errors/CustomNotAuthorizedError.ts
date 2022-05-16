import { CustomError, ErrorResponse } from "./CustomError";

export class CustomNotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super("Not authorized");
        Object.setPrototypeOf(this, CustomNotAuthorizedError.prototype);
    }

    serializeError(): ErrorResponse {
        return [{ message: 'Not authorized' }];
    }

}