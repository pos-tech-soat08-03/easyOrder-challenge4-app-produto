import { CategoriaEnum } from "../../../../../Core/Entity/ValueObject/CategoriaEnum";
import { ListaCategoriasUsecaseInput, ListaCategoriasUsecaseOutput } from "../../../../../Core/Interfaces/Gateway/CategoriaGatewayInterface";
import { ListarCategoriasUsecase } from "../../../../../Core/Usecase/Produtos/ListarCategoriasUsecase";

describe('ListarCategoriasUsecase', () => {
    let usecase: ListarCategoriasUsecase;

    beforeEach(() => {
        usecase = new ListarCategoriasUsecase();
    });

    it('deve retornar uma lista de categorias', async () => {
        const input: ListaCategoriasUsecaseInput = {};
        const expectedOutput: ListaCategoriasUsecaseOutput = {
            categorias: Object.values(CategoriaEnum),
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('deve retornar uma mensagem de erro se nenhuma categoria for encontrada', async () => {
        jest.spyOn(Object, 'values').mockReturnValueOnce([]);
        const input: ListaCategoriasUsecaseInput = {};
        const expectedOutput: ListaCategoriasUsecaseOutput = {
            categorias: [],
            mensagem: "Nenhum item foi encontrado.",
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('deve retornar uma mensagem de erro se ocorrer uma exceção', async () => {
        jest.spyOn(Object, 'values').mockImplementationOnce(() => {
            throw new Error('Test error');
        });
        const input: ListaCategoriasUsecaseInput = {};
        const expectedOutput: ListaCategoriasUsecaseOutput = {
            categorias: [],
            mensagem: "Ocorreu um erro ao listar as categorias.",
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });
});