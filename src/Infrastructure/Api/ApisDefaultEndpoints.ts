import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../../swagger-output.json";

export class DefaultApiEndpoints {

  static start(app: Express): void {

    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

    app.get("/health", (req, res) => {
      /**
        #swagger.tags = ['Outros']
        #swagger.summary = 'Health check'
      */
      res.json({
        status: "UP",
      });
    });

    app.get("/", (req, res) => {
      /**
        #swagger.tags = ['Outros']
        #swagger.ignore = true
      */
      res.status(200).send(`<h1>EasyOrder API 4.0 - Microserviço Produtos</h1><br>`)
    });

  }
}