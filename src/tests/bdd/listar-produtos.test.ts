import { expect } from '@jest/globals';
import { Bdd, Feature, val } from 'easy-bdd-tool-jest';
import { Collection, Db } from "mongodb";
import { ProdutoGateway } from '../../Application/Gateway/ProdutoGateway';
import { CategoriaEnum } from '../../Core/Entity/ValueObject/CategoriaEnum';
import { ProdutoController } from '../../Application/Controller/ProdutoController';

const feature = new Feature('Listar produtos', `
  Para gerenciar o catálogo de produtos
  Como um administrador
  Eu quero poder listar os produtos cadastrados
`);

describe("BDD: Lista de Produtos", () => {
    let db: Db;
    let collection: Collection;
    let produtoGateway: ProdutoGateway;

    beforeAll(async () => {
        console.clear();
    });

    beforeEach(async () => {
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

    afterEach(async () => {
        jest.clearAllMocks();
    });

    Bdd(feature)
        .scenario('Deve listar todos os produtos')
        .given('Eu tenho produtos cadastrados')
        .when('Eu chamar a API para listar os produtos')
        .then('A lista de produtos deve ser retornada')
        .and('A lista de produtos deve conter ao menos 2 produto')
        .example(
            val('produtos', [
                {
                    _id: '1',
                    nome: 'Produto 1',
                    descricao: 'Descricao 1',
                    preco: 10,
                    categoria: CategoriaEnum.ACOMPANHAMENTO,
                    imagemurl: 'url1',
                },
                {
                    _id: '2',
                    nome: 'Produto 2',
                    descricao: 'Descricao 2',
                    preco: 20,
                    categoria: CategoriaEnum.LANCHE,
                    imagemurl: 'url2',
                },
            ]),
        )
        .run(async (ctx) => {
            const produtos = ctx.example.val('produtos');

            (collection.find as jest.Mock).mockReturnValue({
                toArray: jest.fn().mockResolvedValue(produtos)
            });

            const response = await ProdutoController.listarProdutos(produtoGateway);

            const json = JSON.parse(response);

            expect(json.mensagem).toBe('Produtos listado com sucesso.');
            expect(json.produtos).toHaveLength(2);
            expect(json.produtos[0].id).toBe("1");
            expect(json.produtos[0].nome).toBe("Produto 1");
        });

});
