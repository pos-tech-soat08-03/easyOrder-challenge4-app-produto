import { CategoriaEnum } from "../../Core/Entity/ValueObject/CategoriaEnum";
import { ProdutoUsesCases } from "../../Core/Usecase/ProdutoUsecases";
import { ProdutoGateway } from "../Gateway/ProdutoGateway";
import { ProdutoAdapter } from "../Presenter/ProdutoAdapter";

export class ProdutoController {

    public static async listarProdutos(produtoGateway: ProdutoGateway): Promise<string> {
        const { produtos, mensagem } = await ProdutoUsesCases.listarProdutosUsecase(produtoGateway);
        if (produtos === undefined || produtos.length === 0) {
            return ProdutoAdapter.adaptPrudoJsonError(mensagem);
        }
        return ProdutoAdapter.adaptJsonListaProduto(produtos, mensagem);
    }

    public static async listarProdutoPorCategoria(produtoGateway: ProdutoGateway, categoria: CategoriaEnum): Promise<string> {
        const { produtos, mensagem } = await ProdutoUsesCases.listarProdutosPorCategoriaUsecase(produtoGateway, categoria);
        if (produtos === undefined || produtos.length === 0) {
            return ProdutoAdapter.adaptPrudoJsonError(mensagem);
        }
        return ProdutoAdapter.adaptJsonListaProduto(produtos, mensagem);
    }

    public static async buscarProdutoPorId(produtoGateway: ProdutoGateway, id: string): Promise<string> {
        const { produto, mensagem } = await ProdutoUsesCases.buscarProdutoPorIdUsecase(produtoGateway, id);
        if (produto === undefined) {
            return ProdutoAdapter.adaptPrudoJsonError(mensagem);
        }
        return ProdutoAdapter.adaptJsonProduto(produto, mensagem);
    }

    public static async cadastrarProduto(produtoGateway: ProdutoGateway, nome: string, descricao: string, preco: number, categoria: CategoriaEnum, imagemURL: string): Promise<string> {
        const { produto, mensagem } = await ProdutoUsesCases.salvarProdutoUsecase(produtoGateway, nome, descricao, preco, categoria, imagemURL);
        if (produto === undefined) {
            return ProdutoAdapter.adaptPrudoJsonError(mensagem);
        }
        return ProdutoAdapter.adaptJsonProduto(produto, mensagem);
    }

    public static async atualizarProduto(produtoGateway: ProdutoGateway, nome: string, descricao: string, preco: number, categoria: CategoriaEnum, imagemURL: string, id: string): Promise<string> {
        const { produto, mensagem } = await ProdutoUsesCases.atualizarProdutoUsecase(produtoGateway, id, nome, descricao, preco, categoria, imagemURL);
        if (produto === undefined) {
            return ProdutoAdapter.adaptPrudoJsonError(mensagem);
        }
        return ProdutoAdapter.adaptJsonProduto(produto, mensagem);
    }

    public static async removerProdutoPorId(produtoGateway: ProdutoGateway, id: string): Promise<string> {
        const { produtoID, mensagem } = await ProdutoUsesCases.removerProdutoPorIdUsecase(produtoGateway, id);

        return ProdutoAdapter.adaptJsonProdutoId(produtoID, mensagem);
    }

}