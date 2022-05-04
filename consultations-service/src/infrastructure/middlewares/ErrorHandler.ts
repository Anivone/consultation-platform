import {
  BadRequestError,
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): any {
    if (error instanceof BadRequestError) {
      return response.status(400).send(this.transformValidationError(error));
    }

    if (error instanceof CustomError) {
      console.error(error)
      return response.status(error.statusCode).send(error.serializeError());
    }

    console.error(error);
    response.status(404).send([{ message: "Something went wrong" }]);
  }

  private transformValidationError(error: BadRequestError) {
    const err = error as any;
    const getConstraint = (e: any) =>
      e.constraints[Object.keys(e.constraints)[0]];

    return err.errors.map((e: any) => {
      return { message: getConstraint(e), field: e.property };
    });
  }
}
