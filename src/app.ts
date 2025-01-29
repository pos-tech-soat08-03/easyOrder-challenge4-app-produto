import express from "express";
import { MySQLConnection } from "./easyorder/Infrastructure/DB/Impl/MySQLConnection";
import { CategoriaGatewayMock } from "./easyorder/Infrastructure/DB/Mock/CategoriaGatewayMock";
import { DefaultApiEndpoints } from "./easyorder/Infrastructure/Api/ApisDefaultEndpoints";
import { ApiProdutos } from "./easyorder/Infrastructure/Api/ApiProdutos";

// Inicialização de banco de dados
const categoriaGatewayMock = new CategoriaGatewayMock();
const mysqlConnection = new MySQLConnection({
  hostname: process.env.DATABASE_HOST ?? "ERROR",
  portnumb: Number(process.env.DATABASE_PORT ?? "0"),
  database: process.env.DATABASE_NAME ?? "ERROR",
  username: process.env.DATABASE_USER ?? "ERROR",
  password: process.env.DATABASE_PASS ?? "ERROR",
  databaseType: 'mysql'
});


// Inicialização de framework Express + endpoints default
const port = Number(process.env.SERVER_PORT ?? "3000");
const app = express();
DefaultApiEndpoints.start(app);

// Inicialização de endpoints da aplicação
ApiProdutos.start(mysqlConnection, app);

// Inicialização do Express server
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});