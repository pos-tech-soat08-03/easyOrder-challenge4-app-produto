
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { DefaultApiEndpoints } from '../../../../Infrastructure/Api/ApisDefaultEndpoints';
import swaggerUi from 'swagger-ui-express';

// Mock swaggerUi.serve and swaggerUi.setup
jest.mock('swagger-ui-express', () => ({
    serve: (req: Request, res: Response, next: NextFunction) => next(),
    setup: () => (req: Request, res: Response) => res.send('Swagger UI')
}));

describe("ApisDefaultEndpoints", () => {
    let app: express.Express;

    beforeEach(() => {
        app = express();
        DefaultApiEndpoints.start(app);
    });

    it('devem servir a documentação do swagger em /doc', async () => {
        const response = await request(app).get('/doc');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Swagger UI');
    });

    it('devem retornar status UP em /health', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'UP' });
    });

    it('devem retornar a mensagem de boas-vindas em /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('EasyOrder API 4.0 - Microserviço Produtos');
    });

});