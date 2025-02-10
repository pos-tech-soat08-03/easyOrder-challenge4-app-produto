import { expect } from '@jest/globals';
import { Bdd, Feature, val } from 'easy-bdd-tool-jest';
import { Collection, Db } from "mongodb";
import { ProdutoGateway } from '../../Application/Gateway/ProdutoGateway';
import { CategoriaEnum } from '../../Core/Entity/ValueObject/CategoriaEnum';
import { ProdutoController } from '../../Application/Controller/ProdutoController';

const feature = new Feature('Criar novo produto', `
  Para gerenciar o catálogo de produtos
  Como um administrador
  Eu quero poder adicionar novos produtos
`);

describe("BDD: Cadastro Produto", () => {
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
        .scenario('Deve criar um novo produto')
        .given('Eu tenho os dados de um novo produto')
        .and('Eu tenho a categoria do produto')
        .when('Eu chamado a API para criar um novo produto')
        .then('O novo produto deve ser adicionado à lista de produtos')
        .and('A lista de produtos deve conter ao menos 1 produto')
        .and('O novo produto deve ser o último da lista')
        .example(
            val('produto', {
                id: '1',
                nome: 'Produto 1',
                descricao: 'Descricao 1',
                preco: 10,
                categoria: CategoriaEnum.ACOMPANHAMENTO,
                imagemurl: 'url1',
            }),
        )
        .run(async (ctx) => {
            const produto = ctx.example.val('produto');

            (collection.updateOne as jest.Mock).mockResolvedValue(produto);

            const response = await ProdutoController.cadastrarProduto(
                produtoGateway,
                produto.nome,
                produto.descricao,
                produto.preco,
                produto.categoria,
                produto.imagemurl,
            );

            const json = JSON.parse(response);

            expect(json.mensagem).toBe('Produto salvo com sucesso.');

        });

});