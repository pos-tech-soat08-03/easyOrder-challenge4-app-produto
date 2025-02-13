import express from "express";
import { DefaultApiEndpoints } from "./Infrastructure/Api/ApisDefaultEndpoints";
import { ApiProdutos } from "./Infrastructure/Api/ApiProdutos";
import { ProdutoGateway } from "./Application/Gateway/ProdutoGateway";
import { MongoClient } from "mongodb";

// Configuração do MongoDB
const DATABASE_HOST = process.env.DATABASE_HOST ?? "svc-easyorder-app-produto-database";
const DATABASE_PORT = process.env.DATABASE_PORT ?? "27017";
const DATABASE_NAME = process.env.DATABASE_NAME ?? "easyorder";
const DATABASE_USER = process.env.DATABASE_USER ?? "easyorder_mongo_username";
const DATABASE_PASSWORD = process.env.DATABASE_PASS ?? "easyorder_mongo_password10";
const MONGODB_URI = process.env.MONGODB_URI ?? `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}`;
console.log(`MONGODB_URI: ${MONGODB_URI}`);

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