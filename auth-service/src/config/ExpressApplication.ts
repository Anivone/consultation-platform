import express from "express";
import { json } from "body-parser";
import { useExpressServer } from "routing-controllers";
import * as path from "path";
import { AwilixContainer } from "awilix";
import initContainer from "./AwilixContainer";
import { scopePerRequest } from "awilix-express";
import cookieParser from "cookie-parser";
import { checkAuthorization } from "../infrastructure/middlewares/CheckAuthorization";
import { checkCurrentUser } from "../infrastructure/middlewares/CheckCurrentUser";

require("express-async-errors");

export class ExpressApplication {
  app: express.Application;
  container: AwilixContainer;

  constructor() {
    this.app = express();
    this.app.set("trust proxy", true);

    this.app.use(json());
    this.app.use(cookieParser());

    this.container = initContainer();
    this.app.use(scopePerRequest(this.container));

    this.setUpControllers();
  }

  private setUpControllers() {
    useExpressServer(this.app, {
      authorizationChecker: checkAuthorization,
      currentUserChecker: checkCurrentUser,
      routePrefix: "/api/auth",
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
