import express from "express";
import { DefaultApiEndpoints } from "./Infrastructure/Api/ApisDefaultEndpoints";
import { ApiProdutos } from "./Infrastructure/Api/ApiProdutos";
import { ProdutoGateway } from "./Application/Gateway/ProdutoGateway";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const produtoGateway = new ProdutoGateway(client.db("easyorder"));

  // Inicialização de framework Express + endpoints default
  const port = Number(process.env.SERVER_PORT ?? "3000");
  const app = express();
  DefaultApiEndpoints.start(app);

  // Inicialização de endpoints da aplicação
  ApiProdutos.start(produtoGateway, app);

  // Inicialização do Express server
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

}

main().catch(console.error);