import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { useExpressServer } from "routing-controllers";
import * as path from "path";
import { scopePerRequest } from "awilix-express";
import initContainer from "./AwilixContainer";
import {checkAuthorization} from "../infrastructure/middlewares/CheckAuthorization";
import {checkCurrentUser} from "../infrastructure/middlewares/CheckCurrentUser";

require("express-async-errors");

export class ExpressApplication {
  app: express.Application;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", true);

    this.app.use(json());
    this.app.use(cookieParser());

    const container = initContainer();
    this.app.use(scopePerRequest(container));

    this.setUpControllers();
  }

  private setUpControllers() {
    useExpressServer(this.app, {
      authorizationChecker: checkAuthorization,
      currentUserChecker: checkCurrentUser,
      routePrefix: "/api",
      controllers: [
        path.resolve("src", "infrastructure", "controllers", "*.ts"),
      ],
      middlewares: [
        path.resolve("src", "infrastructure", "middlewares", "*.ts"),
      ],
      defaultErrorHandler: false,
    });
  }
}
