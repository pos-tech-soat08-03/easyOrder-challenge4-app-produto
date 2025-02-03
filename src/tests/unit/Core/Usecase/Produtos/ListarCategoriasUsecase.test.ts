import { CategoriaEnum } from "../../../../../Core/Entity/ValueObject/CategoriaEnum";
import { ListaCategoriasUsecaseInput, ListaCategoriasUsecaseOutput } from "../../../../../Core/Interfaces/Gateway/CategoriaGatewayInterface";
import { ListarCategoriasUsecase } from "../../../../../Core/Usecase/Produtos/ListarCategoriasUsecase";

describe('ListarCategoriasUsecase', () => {
    let usecase: ListarCategoriasUsecase;

    beforeEach(() => {
        usecase = new ListarCategoriasUsecase();
    });

    it('should return a list of categories', async () => {
        const input: ListaCategoriasUsecaseInput = {};
        const expectedOutput: ListaCategoriasUsecaseOutput = {
            categorias: Object.values(CategoriaEnum),
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('should return an error message if no categories are found', async () => {
        jest.spyOn(Object, 'values').mockReturnValueOnce([]);
        const input: ListaCategoriasUsecaseInput = {};
        const expectedOutput: ListaCategoriasUsecaseOutput = {
            categorias: [],
            mensagem: "Nenhum item foi encontrado.",
        };

        const output = await usecase.execute(input);

        expect(output).toEqual(expectedOutput);
    });

    it('should return an error message if an exception occurs', async () => {
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