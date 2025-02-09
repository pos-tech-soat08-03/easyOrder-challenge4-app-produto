import { DataNotFoundException, PersistenceErrorException, ValidationErrorException } from "../../../../Core/Types/ExceptionType";

describe('ExceptionType Tests', () => {
    test('DataNotFoundException deve ter o nome e a mensagem corretos', () => {
        const message = "Custom data not found message";
        const exception = new DataNotFoundException(message);
        expect(exception.name).toBe('DataNotFoundException');
        expect(exception.message).toBe(message);
    });

    test('ValidationErrorException deve ter o nome e a mensagem corretos', () => {
        const message = "Custom validation error message";
        const exception = new ValidationErrorException(message);
        expect(exception.name).toBe('ValidationErrorException');
        expect(exception.message).toBe(message);
    });

    test('PersistenceErrorException deve ter o nome e a mensagem corretos', () => {
        const message = "Custom persistence error message";
        const exception = new PersistenceErrorException(message);
        expect(exception.name).toBe('PersistenceErrorException');
        expect(exception.message).toBe(message);
    });

    test('DataNotFoundException deve ter a mensagem padrão', () => {
        const exception = new DataNotFoundException();
        expect(exception.message).toBe("Data not found");
    });

    test('ValidationErrorException deve ter a mensagem padrão', () => {
        const exception = new ValidationErrorException();
        expect(exception.message).toBe("Validation error");
    });

    test('PersistenceErrorException deve ter a mensagem padrão', () => {
        const exception = new PersistenceErrorException();
        expect(exception.message).toBe("Validation error");
    });
});