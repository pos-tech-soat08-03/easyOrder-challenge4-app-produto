import { CategoriaEnum } from '../../../../../../src/Core/Entity/ValueObject/CategoriaEnum';

describe('CategoriaEnum', () => {
    it('deve ter LANCHE como um valor de enumeração válido', () => {
        expect(CategoriaEnum.LANCHE).toBe('LANCHE');
    });

    it('deve ter BEBIDA como um valor de enumeração válido', () => {
        expect(CategoriaEnum.BEBIDA).toBe('BEBIDA');
    });

    it('devem ter SOBREMESA como um valor de enumeração válido', () => {
        expect(CategoriaEnum.SOBREMESA).toBe('SOBREMESA');
    });

    it('devem ter ACOMPANHAMENTO como um valor de enumeração válido', () => {
        expect(CategoriaEnum.ACOMPANHAMENTO).toBe('ACOMPANHAMENTO');
    });

    it('devem ter todos os valores de enumeração', () => {
        const enumValues = Object.values(CategoriaEnum);
        expect(enumValues).toEqual(['LANCHE', 'BEBIDA', 'SOBREMESA', 'ACOMPANHAMENTO']);
    });
});