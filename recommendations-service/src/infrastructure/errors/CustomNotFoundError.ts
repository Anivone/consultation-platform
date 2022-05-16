import { CustomError, ErrorResponse } from "./CustomError";

export class CustomNotFoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, CustomNotFoundError.prototype);
    }

    serializeError(): ErrorResponse {
        return [{ message: 'Route not found' }];
    }
    
}