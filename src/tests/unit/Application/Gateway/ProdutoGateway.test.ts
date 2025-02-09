import { ProdutoGateway } from "../../../../Application/Gateway/ProdutoGateway";
import { ProdutoEntity } from "../../../../Core/Entity/ProdutoEntity";
import { DataNotFoundException } from "../../../../Core/Types/ExceptionType";
import { CategoriaEnum } from "../../../../Core/Entity/ValueObject/CategoriaEnum";
import { Collection, Db, MongoClient, ObjectId } from "mongodb";

jest.mock("mongodb");

describe("ProdutoGateway", () => {
    let db: Db;
    let collection: Collection;
    let produtoGateway: ProdutoGateway;

    beforeEach(() => {
        db = {
            collection: jest.fn().mockReturnThis(),
        } as unknown as Db;
        collection = {
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        } as unknown as Collection;
        (db.collection as jest.Mock).mockReturnValue(collection);
        produtoGateway = new ProdutoGateway(db);

        jest.spyOn(console, "log").mockImplementation(() => { });
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("deve listar todos os produtos", async () => {
        const mockProdutos = [
            { nome: "Produto 1", descricao: "Descricao 1", preco: 10, categoria: CategoriaEnum.ACOMPANHAMENTO, imagemURL: "url1", _id: "1" },
            { nome: "Produto 2", descricao: "Descricao 2", preco: 20, categoria: CategoriaEnum.LANCHE, imagemURL: "url2", _id: "2" }
        ];
        (collection.find as jest.Mock).mockReturnValue({
            toArray: jest.fn().mockResolvedValue(mockProdutos)
        });

        const produtos = await produtoGateway.listarProdutos();

        expect(produtos).toHaveLength(2);
        expect(produtos[0]).toBeInstanceOf(ProdutoEntity);
        expect(produtos[0].getId()).toBe("1");
        expect(produtos[0].getNome()).toBe("Produto 1");
    });

    it("deve listar produtos por categoria", async () => {
        const mockProdutos = [
            { nome: "Produto 1", descricao: "Descricao 1", preco: 10, categoria: CategoriaEnum.ACOMPANHAMENTO, imagemURL: "url1", _id: "1" },
            { nome: "Produto 2", descricao: "Descricao 2", preco: 20, categoria: CategoriaEnum.ACOMPANHAMENTO, imagemURL: "url2", _id: "2" }
        ];
        (collection.find as jest.Mock).mockReturnValue({
            toArray: jest.fn().mockResolvedValue(mockProdutos)
        });

        const produtos = await produtoGateway.listarProdutoCategoria(CategoriaEnum.ACOMPANHAMENTO);

        expect(produtos).toHaveLength(2);
        expect(produtos[0]).toBeInstanceOf(ProdutoEntity);
        expect(produtos[0].getId()).toBe("1");
        expect(produtos[0].getNome()).toBe("Produto 1");
    });

    it("deve buscar produto por id", async () => {
        const mockProduto = { nome: "Produto 1", descricao: "Descricao 1", preco: 10, categoria: CategoriaEnum.ACOMPANHAMENTO, imagemURL: "url1", _id: "1" };
        (collection.findOne as jest.Mock).mockResolvedValue(mockProduto);

        const produto = await produtoGateway.buscarProdutoPorId("1");

        expect(produto).toBeInstanceOf(ProdutoEntity);
        expect(produto.getId()).toBe("1");
        expect(produto.getNome()).toBe("Produto 1");
    });

    it('deve salvar um produto', async () => {
        const mockProduto = new ProdutoEntity("Produto 1", "Descricao 1", 10, CategoriaEnum.ACOMPANHAMENTO, "url1", "1");

        (collection.updateOne as jest.Mock).mockResolvedValue(mockProduto);

        await produtoGateway.salvarProduto(mockProduto);

        expect(collection.updateOne).toHaveBeenCalledWith(
            { _id: "1" },
            {
                $set: {
                    _id: "1",
                    nome: "Produto 1",
                    descricao: "Descricao 1",
                    preco: 10,
                    categoria: CategoriaEnum.ACOMPANHAMENTO,
                    imagemURL: "url1",
                }
            },
            { upsert: true }
        );
    });

    it('deve remover um produto por id', async () => {
        (collection.deleteOne as jest.Mock).mockResolvedValue({});

        await produtoGateway.removerPorId("1");

        expect(collection.deleteOne).toHaveBeenCalledWith({ _id: "1" });
    });

    it('deve lançar DataNotFoundException quando produto não for encontrado', async () => {
        (collection.findOne as jest.Mock).mockResolvedValue(null);

        await expect(produtoGateway.buscarProdutoPorId("1")).rejects.toThrow(DataNotFoundException);
    });

    it('deve lançar erro ao salvar produto', async () => {
        const mockProduto = new ProdutoEntity("Produto 1", "Descricao 1", 10, CategoriaEnum.ACOMPANHAMENTO, "url1", "1");
        (collection.updateOne as jest.Mock).mockRejectedValue(new Error("Erro ao salvar"));

        await expect(produtoGateway.salvarProduto(mockProduto)).rejects.toThrow("Erro ao salvar produto: {}");
    });
});