import { ProdutoEntity } from '../../../easyorder/Core/Entity/ProdutoEntity';
import { CategoriaEnum } from '../../../easyorder/Core/Entity/ValueObject/CategoriaEnum';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('ProdutoEntity', () => {
    const nome = 'Produto Teste';
    const descricao = 'Descrição do Produto Teste';
    const preco = 100.0;
    const categoria = CategoriaEnum.ACOMPANHAMENTO;
    const imagemURL = 'https://imagem.com/produto.jpg';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um produto com o ID pre-definido quando informado', () => {
        const id = '123e4567-e89b-12d3-a456-426614174000';
        const produto = new ProdutoEntity(nome, descricao, preco, categoria, imagemURL, id);

        expect(produto.getId()).toBe(id);
        expect(produto.getNome()).toBe(nome);
        expect(produto.getDescricao()).toBe(descricao);
        expect(produto.getPreco()).toBe(preco);
        expect(produto.getCategoria()).toBe(categoria);
        expect(produto.getImagemURL()).toBe(imagemURL);
    });

    it('deve criar um produto com um novo ID, quando nao informado', () => {
        const generatedId = '123e4567-e89b-12d3-a456-426614174001';
        (uuidv4 as jest.Mock).mockReturnValue(generatedId);

        const produto = new ProdutoEntity(nome, descricao, preco, categoria, imagemURL);

        expect(produto.getId()).toBe(generatedId);
        expect(produto.getNome()).toBe(nome);
        expect(produto.getDescricao()).toBe(descricao);
        expect(produto.getPreco()).toBe(preco);
        expect(produto.getCategoria()).toBe(categoria);
        expect(produto.getImagemURL()).toBe(imagemURL);
    });
});