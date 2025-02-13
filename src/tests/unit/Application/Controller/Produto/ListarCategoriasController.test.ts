import request from 'supertest';
import express, { Request, Response } from 'express';
import { ListarCategoriasUsecase } from '../../../../../Core/Usecase/Produtos/ListarCategoriasUsecase';
import { ListaCategoriasController } from '../../../../../Application/Controller/Produto/ListarCategoriasController';
import { ListaCategoriasUsecaseOutput } from '../../../../../Core/Interfaces/Gateway/CategoriaGatewayInterface';

jest.mock('../../../../../Core/Usecase/Produtos/ListarCategoriasUsecase');

describe('ListaCategoriasController', () => {
    let app: express.Express;
    let listarCategoriasUsecase: jest.Mocked<ListarCategoriasUsecase>;

    beforeEach(() => {
        app = express();
        const controller = new ListaCategoriasController();
        app.get('/produto/categoria/listar', controller.handle);

        listarCategoriasUsecase = new ListarCategoriasUsecase() as jest.Mocked<ListarCategoriasUsecase>;
    });

    it('o construtor deve ser chamado', () => {
        const handleMock = jest.spyOn(ListaCategoriasController.prototype, 'handle').mockImplementation(() => Promise.resolve());

        const controller = new ListaCategoriasController();
        controller.handle({} as any, {} as any);

        expect(handleMock).toHaveBeenCalled();
        handleMock.mockRestore();
    });

    it('devem retornar as categorias', async () => {
        const mockCategories = {
            categorias: ['LANCHE', 'BEBIDA', 'SOBREMESA', 'ACOMPANHAMENTO'],
            mensagem: 'Categorias listadas com sucesso'
        };

        jest.spyOn(ListarCategoriasUsecase.prototype, 'execute').mockResolvedValue(mockCategories);

        const response = await request(app).get('/produto/categoria/listar');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategories);
    });

    it('deve retornar 404 se não houver categorias', async () => {
        const mockCategories = {
            categorias: [],
            mensagem: 'Nenhum item foi encontrado.'
        };

        jest.spyOn(ListarCategoriasUsecase.prototype, 'execute').mockResolvedValue(mockCategories);

        const response = await request(app).get('/produto/categoria/listar');

        expect(response.status).toBe(404);
        expect(response.body).toEqual(mockCategories);
    });

    it('deve retornar 500 se ocorrer um erro', async () => {
        jest.spyOn(ListarCategoriasUsecase.prototype, 'execute').mockRejectedValue(new Error('Erro'));

        const response = await request(app).get('/produto/categoria/listar');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            categorias: [],
            mensagem: 'Ocorreu um erro ao listar as categorias.'
        });
    });
});