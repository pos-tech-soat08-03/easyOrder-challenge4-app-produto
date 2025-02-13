import { Request, Response } from 'express';
import { ProdutoGateway } from '../../../../Application/Gateway/ProdutoGateway';
import { Db } from 'mongodb';
import { ApiProdutos } from '../../../../Infrastructure/Api/ApiProdutos';
import { ProdutoController } from '../../../../Application/Controller/ProdutoController';

jest.mock('.../../../../Application/Gateway/ProdutoGateway');
jest.mock('../../../../Application/Controller/ProdutoController');

describe("Infrastructure / Api / ApiProdutos", () => {
    let produtoGateway: ProdutoGateway;
    let req: Partial<Request>;
    let res: Partial<Response>;

    const DEFAULT_EXPRESS_APP = {
        get: jest.fn(),
        use: jest.fn(),
        delete: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
    } as any;

    beforeEach(() => {
        produtoGateway = new ProdutoGateway({
            collection: jest.fn().mockReturnThis(),
        } as unknown as Db);
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        jest.spyOn(console, "log").mockImplementation(() => { });
        jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve testar a rota /produto/listar', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produtos listados com sucesso",
                "produtos": [
                    {
                        "id": "1",
                        "nome": "Product 1",
                        "descricao": "Description 1",
                        "preco": 10,
                        "categoria": "ACOMPANHAMENTO",
                        "imagem_url": "url1",
                    }
                ]
            }
        `;
        (ProdutoController.listarProdutos as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/listar') {
                    handler(req, res);
                }
            },
        });

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/listar com erro', async () => {
        (ProdutoController.listarProdutos as jest.Mock).mockImplementation(() => {
            throw new Error("Erro ao listar produtos");
        });

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/listar') {
                    handler(req, res);
                }
            },
        });

        expect(res.send).toHaveBeenCalledWith("Erro ao listar produtos");
    });

    it('deve testar a rota /produto/buscar/:id', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produto encontrado com sucesso",
                "produto": {
                    "id": "1",
                    "nome": "Product 1",
                    "descricao": "Description 1",
                    "preco": 10,
                    "categoria": "ACOMPANHAMENTO",
                    "imagem_url": "url1",
                }
            }
        `;
        (ProdutoController.buscarProdutoPorId as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/buscar/:id') {
                    handler({
                        ...req,
                        params: { id: '1' }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/buscar/:id com id inválido', async () => {
        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/buscar/:id') {
                    handler({
                        ...req,
                        params: { id: null }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith('ID inválido.');
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('deve testar a rota /produto/listar/:categoria', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produtos listados com sucesso",
                "produtos": [
                    {
                        "id": "1",
                        "nome": "Product 1",
                        "descricao": "Description 1",
                        "preco": 10,
                        "categoria": "ACOMPANHAMENTO",
                        "imagem_url": "url1",
                    }
                ]
            }
        `;
        (ProdutoController.listarProdutoPorCategoria as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/listar/:categoria') {
                    handler({
                        ...req,
                        params: { categoria: 'ACOMPANHAMENTO' }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/listar/:categoria com a categoria inválida', async () => {
        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            get: (path: string, handler: any) => {
                if (path === '/produto/listar/:categoria') {
                    handler({
                        ...req,
                        params: { categoria: 'test' }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith('Categoria inválida');
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('deve testar a rota /produto/remover/:id', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produto removido com sucesso",
                "id": "1"
            }
        `;
        (ProdutoController.removerProdutoPorId as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            delete: (path: string, handler: any) => {
                if (path === '/produto/remover/:id') {
                    handler({
                        ...req,
                        params: { id: '1' }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/remover/:id com id inválido', async () => {
        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            delete: (path: string, handler: any) => {
                if (path === '/produto/remover/:id') {
                    handler({
                        ...req,
                        params: { id: null }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith('ID inválido.');
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('deve testar a rota /produto/cadastrar com erro de body vazio', async () => {
        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            post: (path: string, handler: any) => {
                if (path === '/produto/cadastrar') {
                    handler(req, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith('Nenhum dado informado.');
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('deve testar a rota /produto/cadastrar', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produto cadastrado com sucesso",
                "produto": {
                    "id": "1",
                    "nome": "Product 1",
                    "descricao": "Description 1",
                    "preco": 10,
                    "categoria": "ACOMPANHAMENTO",
                    "imagem_url": "url1",
                }
            }
        `;
        (ProdutoController.cadastrarProduto as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            post: (path: string, handler: any) => {
                if (path === '/produto/cadastrar') {
                    handler({
                        ...req,
                        body: {
                            nome: 'Product 1',
                            descricao: 'Description 1',
                            preco: 10,
                            categoria: 'ACOMPANHAMENTO',
                            imagem_url: 'url1',
                        }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/atualizar', async () => {
        const mockControllerResponse = `
            {
                "mensagem": "Produto atualizado com sucesso",
                "produto": {
                    "id": "1",
                    "nome": "Product 1",
                    "descricao": "Description 1",
                    "preco": 10,
                    "categoria": "ACOMPANHAMENTO",
                    "imagem_url": "url1",
                }
            }
        `;
        (ProdutoController.atualizarProduto as jest.Mock).mockResolvedValue(mockControllerResponse);

        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            put: (path: string, handler: any) => {
                if (path === '/produto/atualizar') {
                    handler({
                        ...req,
                        body: {
                            id: '1',
                            nome: 'Product 1',
                            descricao: 'Description 1',
                            preco: 10,
                            categoria: 'ACOMPANHAMENTO',
                            imagem_url: 'url1',
                        }
                    }, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith(mockControllerResponse);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('deve testar a rota /produto/atualizar com o body vazio', async () => {
        await ApiProdutos.start(produtoGateway, {
            ...DEFAULT_EXPRESS_APP,
            put: (path: string, handler: any) => {
                if (path === '/produto/atualizar') {
                    handler(req, res);
                }
            },
        } as any);

        expect(res.send).toHaveBeenCalledWith('Nenhum dado informado.');
        expect(res.status).toHaveBeenCalledWith(400);
    });
});