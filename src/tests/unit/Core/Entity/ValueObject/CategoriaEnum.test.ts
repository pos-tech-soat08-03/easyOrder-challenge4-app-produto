import { CategoriaEnum } from '../../../../../../src/Core/Entity/ValueObject/CategoriaEnum';

describe('CategoriaEnum', () => {
    it('should have LANCHE as a valid enum value', () => {
        expect(CategoriaEnum.LANCHE).toBe('LANCHE');
    });

    it('should have BEBIDA as a valid enum value', () => {
        expect(CategoriaEnum.BEBIDA).toBe('BEBIDA');
    });

    it('should have SOBREMESA as a valid enum value', () => {
        expect(CategoriaEnum.SOBREMESA).toBe('SOBREMESA');
    });

    it('should have ACOMPANHAMENTO as a valid enum value', () => {
        expect(CategoriaEnum.ACOMPANHAMENTO).toBe('ACOMPANHAMENTO');
    });

    it('should contain all enum values', () => {
        const enumValues = Object.values(CategoriaEnum);
        expect(enumValues).toEqual(['LANCHE', 'BEBIDA', 'SOBREMESA', 'ACOMPANHAMENTO']);
    });
});