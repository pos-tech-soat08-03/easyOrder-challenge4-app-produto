import { Sequelize } from "sequelize";
import { ProdutoGateway } from "../../../../Application/Gateway/ProdutoGateway";
import { ProdutoEntity } from "../../../../Core/Entity/ProdutoEntity";
import { DataNotFoundException } from "../../../../Core/Types/ExceptionType";
import { CategoriaEnum } from "../../../../Core/Entity/ValueObject/CategoriaEnum";

jest.mock("sequelize");

describe("ProdutoGateway", () => {
    let produtoGateway: ProdutoGateway;
    let mockSequelize: jest.Mocked<Sequelize>;

    beforeEach(() => {
        mockSequelize = new Sequelize() as jest.Mocked<Sequelize>;
        produtoGateway = new ProdutoGateway({
            database: "testdb",
            username: "testuser",
            password: "testpass",
            hostname: "localhost",
            portnumb: 5432,
            databaseType: "postgres",
        });
        produtoGateway["sequelize"] = mockSequelize;
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

    it("deve lançar DataNotFoundException quando o produto não for encontrado por ID", async () => {
        jest.spyOn(produtoGateway, "buscarProdutoPorId").mockRejectedValue(new DataNotFoundException());

        await expect(produtoGateway.buscarProdutoPorId("1")).rejects.toThrow(DataNotFoundException);
    });

    it("deve inserir um novo produto", async () => {
        const produto = new ProdutoEntity("Produto 1", "Descricao 1", 100, CategoriaEnum.ACOMPANHAMENTO, "http://example.com/1.jpg", "1");

        jest.spyOn(produtoGateway, "salvarProduto").mockResolvedValue();

        await produtoGateway.salvarProduto(produto);

        expect(produtoGateway.salvarProduto).toHaveBeenCalledWith(produto);
    });

    it("deve remover um produto por ID", async () => {
        jest.spyOn(produtoGateway, "removerPorId").mockResolvedValue();

        await produtoGateway.removerPorId("1");

        expect(produtoGateway.removerPorId).toHaveBeenCalledWith("1");
    });

    it("deve listar produtos por categoria", async () => {
        jest.spyOn(produtoGateway, "listarProdutoCategoria").mockResolvedValue([
            new ProdutoEntity("Produto 1", "Descricao 1", 100, CategoriaEnum.ACOMPANHAMENTO, "http://example.com/1.jpg", "1"),
        ]);

        const result = await produtoGateway.listarProdutoCategoria(CategoriaEnum.ACOMPANHAMENTO);

        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(ProdutoEntity);
        expect(result[0].getId()).toBe("1");
        expect(result[0].getNome()).toBe("Produto 1");
    });

    it("deve retornar uma lista vazia ao listar produtos por categoria", async () => {
        jest.spyOn(produtoGateway, "listarProdutoCategoria").mockResolvedValue([]);

        const result = await produtoGateway.listarProdutoCategoria(CategoriaEnum.ACOMPANHAMENTO);

        expect(result).toHaveLength(0);
    });
});