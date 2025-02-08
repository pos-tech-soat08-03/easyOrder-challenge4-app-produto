import { ProdutoGateway } from "../../../../Application/Gateway/ProdutoGateway";
import { ProdutoEntity } from "../../../../Core/Entity/ProdutoEntity";
import { DataNotFoundException } from "../../../../Core/Types/ExceptionType";
import { CategoriaEnum } from "../../../../Core/Entity/ValueObject/CategoriaEnum";
import mongoose from "mongoose";

jest.mock("mongoose");

describe("ProdutoGateway", () => {
    let produtoGateway: ProdutoGateway;

    beforeEach(() => {
        produtoGateway = new ProdutoGateway();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve listar todos os produtos", async () => {
        jest.spyOn(produtoGateway, "listarProdutos").mockResolvedValue([
            new ProdutoEntity("Produto 1", "Descricao 1", 100, CategoriaEnum.ACOMPANHAMENTO, "http://example.com/1.jpg", "1"),
        ]);

        const result = await produtoGateway.listarProdutos();

        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(ProdutoEntity);
        expect(result[0].getId()).toBe("1");
        expect(result[0].getNome()).toBe("Produto 1");
    });

    it("deve buscar um produto por ID", async () => {
        jest.spyOn(produtoGateway, "buscarProdutoPorId").mockResolvedValue(
            new ProdutoEntity("Produto 1", "Descricao 1", 100, CategoriaEnum.ACOMPANHAMENTO, "http://example.com/1.jpg", "1")
        );

        const result = await produtoGateway.buscarProdutoPorId("1");

        expect(result).toBeInstanceOf(ProdutoEntity);
        expect(result.getId()).toBe("1");
        expect(result.getNome()).toBe("Produto 1");
    });

    // Adicione mais testes conforme necessário
});