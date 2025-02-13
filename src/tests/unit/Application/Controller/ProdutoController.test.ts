import { Db } from "mongodb";
import { ProdutoController } from "../../../../Application/Controller/ProdutoController";
import { ProdutoGateway } from "../../../../Application/Gateway/ProdutoGateway";
import { ProdutoAdapter } from "../../../../Application/Presenter/ProdutoAdapter";
import { ProdutoUsesCases } from "../../../../Core/Usecase/ProdutoUsecases";
import { CategoriaEnum } from "../../../../Core/Entity/ValueObject/CategoriaEnum";

describe('ProdutoController', () => {
    let produtoGateway: ProdutoGateway;
    let mockDb: Db;

    beforeEach(() => {
        mockDb = {} as Db; // Mock do objeto Db
        produtoGateway = new ProdutoGateway(mockDb);
    });

    it('deve listar produtos', async () => {
        const mockProdutos = [{ id: '1', nome: 'Produto 1' }] as any;
        jest.spyOn(ProdutoUsesCases, 'listarProdutosUsecase').mockResolvedValue({ produtos: mockProdutos, mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonListaProduto').mockReturnValue('adapted json');

        const result = await ProdutoController.listarProdutos(produtoGateway);

        expect(ProdutoUsesCases.listarProdutosUsecase).toHaveBeenCalledWith(produtoGateway);
        expect(ProdutoAdapter.adaptJsonListaProduto).toHaveBeenCalledWith(mockProdutos, 'Success');
        expect(result).toBe('adapted json');
    });

    it('deve retornar erro ao listar produtos se nenhum produto for encontrado', async () => {
        jest.spyOn(ProdutoUsesCases, 'listarProdutosUsecase').mockResolvedValue({ produtos: [], mensagem: 'Nenhum produto encontrado' });
        jest.spyOn(ProdutoAdapter, 'adaptPrudoJsonError').mockReturnValue('adapted json');

        const result = await ProdutoController.listarProdutos(produtoGateway);

        expect(ProdutoUsesCases.listarProdutosUsecase).toHaveBeenCalledWith(produtoGateway);
        expect(ProdutoAdapter.adaptPrudoJsonError).toHaveBeenCalledWith('Nenhum produto encontrado');
        expect(result).toBe('adapted json');
    });

    it('deve listar produtos por categoria', async () => {
        const mockProdutos = [{ id: '1', nome: 'Produto 1' }] as any;
        jest.spyOn(ProdutoUsesCases, 'listarProdutosPorCategoriaUsecase').mockResolvedValue({ produtos: mockProdutos, mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonListaProduto').mockReturnValue('adapted json');

        const result = await ProdutoController.listarProdutoPorCategoria(produtoGateway, CategoriaEnum.ACOMPANHAMENTO);

        expect(ProdutoUsesCases.listarProdutosPorCategoriaUsecase).toHaveBeenCalledWith(produtoGateway, CategoriaEnum.ACOMPANHAMENTO);
        expect(ProdutoAdapter.adaptJsonListaProduto).toHaveBeenCalledWith(mockProdutos, 'Success');
        expect(result).toBe('adapted json');
    });

    it('deve retornar erro ao listar produtos por categoria se nenhum produto for encontrado', async () => {
        jest.spyOn(ProdutoUsesCases, 'listarProdutosPorCategoriaUsecase').mockResolvedValue({ produtos: [], mensagem: 'Nenhum produto encontrado' });
        jest.spyOn(ProdutoAdapter, 'adaptPrudoJsonError').mockReturnValue('adapted json');

        const result = await ProdutoController.listarProdutoPorCategoria(produtoGateway, CategoriaEnum.ACOMPANHAMENTO);

        expect(ProdutoUsesCases.listarProdutosPorCategoriaUsecase).toHaveBeenCalledWith(produtoGateway, CategoriaEnum.ACOMPANHAMENTO);
        expect(ProdutoAdapter.adaptPrudoJsonError).toHaveBeenCalledWith('Nenhum produto encontrado');
        expect(result).toBe('adapted json');
    });

    it('deve buscar produto por id', async () => {
        const mockProduto = { id: '1', nome: 'Produto 1' } as any;
        jest.spyOn(ProdutoUsesCases, 'buscarProdutoPorIdUsecase').mockResolvedValue({ produto: mockProduto, mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonProduto').mockReturnValue('adapted json');

        const result = await ProdutoController.buscarProdutoPorId(produtoGateway, '1');

        expect(ProdutoUsesCases.buscarProdutoPorIdUsecase).toHaveBeenCalledWith(produtoGateway, '1');
        expect(ProdutoAdapter.adaptJsonProduto).toHaveBeenCalledWith(mockProduto, 'Success');
        expect(result).toBe('adapted json');
    });

    it('deve retornar erro ao buscar produto por id se nenhum produto for encontrado', async () => {
        jest.spyOn(ProdutoUsesCases, 'buscarProdutoPorIdUsecase').mockResolvedValue({ produto: undefined, mensagem: 'Nenhum produto encontrado' });
        jest.spyOn(ProdutoAdapter, 'adaptPrudoJsonError').mockReturnValue('adapted json');

        const result = await ProdutoController.buscarProdutoPorId(produtoGateway, '1');

        expect(ProdutoUsesCases.buscarProdutoPorIdUsecase).toHaveBeenCalledWith(produtoGateway, '1');
        expect(ProdutoAdapter.adaptPrudoJsonError).toHaveBeenCalledWith('Nenhum produto encontrado');
        expect(result).toBe('adapted json');
    });

    it('deve cadastrar um produto', async () => {
        const mockProduto = { id: '1', nome: 'Produto 1' } as any;
        jest.spyOn(ProdutoUsesCases, 'salvarProdutoUsecase').mockResolvedValue({ produto: mockProduto, mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonProduto').mockReturnValue('adapted json');

        const result = await ProdutoController.cadastrarProduto(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');

        expect(ProdutoUsesCases.salvarProdutoUsecase).toHaveBeenCalledWith(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');
        expect(ProdutoAdapter.adaptJsonProduto).toHaveBeenCalledWith(mockProduto, 'Success');
        expect(result).toBe('adapted json');
    });

    it('deve retornar erro ao cadastrar um produto não retornar um produto', async () => {
        jest.spyOn(ProdutoUsesCases, 'salvarProdutoUsecase').mockResolvedValue({ produto: undefined, mensagem: 'Erro ao cadastrar produto' });
        jest.spyOn(ProdutoAdapter, 'adaptPrudoJsonError').mockReturnValue('adapted json');

        const result = await ProdutoController.cadastrarProduto(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');

        expect(ProdutoUsesCases.salvarProdutoUsecase).toHaveBeenCalledWith(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');
        expect(ProdutoAdapter.adaptPrudoJsonError).toHaveBeenCalledWith('Erro ao cadastrar produto');
        expect(result).toBe('adapted json');
    });

    it('deve atualizar um produto', async () => {
        const mockProduto = { id: '1', nome: 'Produto 1' } as any;
        jest.spyOn(ProdutoUsesCases, 'atualizarProdutoUsecase').mockResolvedValue({ produto: mockProduto, mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonProduto').mockReturnValue('adapted json');

        const result = await ProdutoController.atualizarProduto(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url', '1');

        expect(ProdutoUsesCases.atualizarProdutoUsecase).toHaveBeenCalledWith(produtoGateway, '1', 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');
        expect(ProdutoAdapter.adaptJsonProduto).toHaveBeenCalledWith(mockProduto, 'Success');
        expect(result).toBe('adapted json');
    });

    it('deve lançar erro ao atualizar um produto se não retornar um produto', async () => {
        jest.spyOn(ProdutoUsesCases, 'atualizarProdutoUsecase').mockResolvedValue({ produto: undefined, mensagem: 'Erro ao atualizar produto' });
        jest.spyOn(ProdutoAdapter, 'adaptPrudoJsonError').mockReturnValue('adapted json');

        const result = await ProdutoController.atualizarProduto(produtoGateway, 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url', '1');

        expect(ProdutoUsesCases.atualizarProdutoUsecase).toHaveBeenCalledWith(produtoGateway, '1', 'Produto 1', 'Descricao', 100, CategoriaEnum.ACOMPANHAMENTO, 'url');
        expect(ProdutoAdapter.adaptPrudoJsonError).toHaveBeenCalledWith('Erro ao atualizar produto');
        expect(result).toBe('adapted json');
    });

    it('deve remover um produto por id', async () => {
        jest.spyOn(ProdutoUsesCases, 'removerProdutoPorIdUsecase').mockResolvedValue({ produtoID: '1', mensagem: 'Success' });
        jest.spyOn(ProdutoAdapter, 'adaptJsonProdutoId').mockReturnValue('adapted json');

        const result = await ProdutoController.removerProdutoPorId(produtoGateway, '1');

        expect(ProdutoUsesCases.removerProdutoPorIdUsecase).toHaveBeenCalledWith(produtoGateway, '1');
        expect(ProdutoAdapter.adaptJsonProdutoId).toHaveBeenCalledWith('1', 'Success');
        expect(result).toBe('adapted json');
    });
});