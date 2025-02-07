import { Db } from "mongodb";
import { ProdutoEntity } from "../../Core/Entity/ProdutoEntity";
import { CategoriaEnum } from "../../Core/Entity/ValueObject/CategoriaEnum";
import { ProdutoGatewayInterface } from "../../Core/Interfaces/Gateway/ProdutoGatewayInterface";
import { DataNotFoundException } from "../../Core/Types/ExceptionType";

export class ProdutoGateway implements ProdutoGatewayInterface {
  private db: Db;

  constructor(monboDatabase: Db) {
    this.db = monboDatabase;
  }

  public async listarProdutos(): Promise<ProdutoEntity[]> {
    const produtos = await this.db.collection("produtos").find().toArray();
    return produtos.map(produto => new ProdutoEntity(
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.categoria as CategoriaEnum,
      produto.imagemURL,
      produto._id.toString()
    ));
  }

  public async listarProdutoCategoria(categoria: CategoriaEnum): Promise<ProdutoEntity[]> {
    const produtos = await this.db.collection("produtos").find({ categoria }).toArray();
    return produtos.map(produto => new ProdutoEntity(
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.categoria as CategoriaEnum,
      produto.imagemURL,
      produto._id.toString()
    ));
  }

  public async buscarProdutoPorId(id: string): Promise<ProdutoEntity> {
    const produto = await this.db.collection("produtos").findOne({ _id: id });
    if (!produto) {
      throw new DataNotFoundException("Produto não encontrado");
    }
    return new ProdutoEntity(
      produto.nome,
      produto.descricao,
      produto.preco,
      produto.categoria as CategoriaEnum,
      produto.imagemURL,
      produto._id.toString()
    );
  }

  public async salvarProduto(produto: ProdutoEntity): Promise<void> {
    const produtoDoc = {
      _id: produto.getId(),
      nome: produto.getNome(),
      descricao: produto.getDescricao(),
      preco: produto.getPreco(),
      categoria: produto.getCategoria(),
      imagemURL: produto.getImagemURL(),
    };

    console.log("Salvando produto: ", produtoDoc);
    try {
      await this.db.collection("produtos").updateOne(
        { _id: produtoDoc._id },
        { $set: produtoDoc },
        { upsert: true }
      );
      console.log("Produto salvo com sucesso");
    } catch (error) {
      console.error("Erro ao salvar produto: ", error);
      throw new Error("Erro ao salvar produto: " + JSON.stringify(error as Error));
    }
  }

  public async removerPorId(id: string): Promise<void> {
    await this.db.collection("produtos").deleteOne({ _id: id });
  }
}