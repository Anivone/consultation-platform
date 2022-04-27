import { CustomError } from "./CustomError";

export class CustomNotFoundError extends CustomError {
    statusCode: number = 404;

    serializeError(): ErrorResponse {
        return undefined;
    }
    
}