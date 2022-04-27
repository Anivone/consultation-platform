import { CustomError, ErrorResponse } from "./CustomError";

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    serializeError(): ErrorResponse {
        return [{ undefined }];
    }

}