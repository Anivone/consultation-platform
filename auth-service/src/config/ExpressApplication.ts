import express from "express";
import { json } from "body-parser";
import { useExpressServer } from "routing-controllers";
import * as path from "path";

export class ExpressApplication {
  app: express.Application;

  constructor() {
    this.app = express();

    this.app.use(json());

    this.setUpControllers();
  }

  private setUpControllers() {
    useExpressServer(this.app, {
      controllers: [
        path.resolve("src", "infrastructure", "controllers", "*.ts"),
      ],
    });
  }
}
