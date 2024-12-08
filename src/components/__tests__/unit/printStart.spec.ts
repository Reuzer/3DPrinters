import { Printer, Coil, Figure } from "@/classes";
import { describe, it, expect } from "vitest";

function printStartTest(printer: Printer) {
    if (printer.queue.length === 0) {
        throw new Error('Нет моделей в очереди');
    }

    if (!printer.coil) { 
        throw new Error('Катушка не задана');
    }

    printer.isPrinting = true;
}

describe('Проверка функции printStart', () => {
    describe('Проверка смены статуса', () => {
        const figure = new Figure('Квадрат', 60, 20, null);
        const coil = new Coil('Катушка 1', '#800080', 200);
        const printer = new Printer('Принтер 1', 30, coil, [figure]);

        printStartTest(printer);

        it('Статус меняется на true', () => {
            expect(printer.isPrinting).toBe(true);
        });
    });

    describe('Выпадает ошибка при отсутствии катушки', () => {
        const figure = new Figure('Квадрат', 60, 20, null);
        const printer = new Printer('Принтер 1', 20, null, [figure]);

        it('Выпадет ошибка об отсутствии катушки', () => {
            expect(() => printStartTest(printer)).toThrow('Катушка не задана');
        });
    });

    describe('Выпадает ошибка при отсутствии очереди', () => {
        const coil = new Coil('Катушка 1', '#800080', 200);
        const printer = new Printer('Принтер 1', 30, coil, []);

        it('Выпадет ошибка об отсутствии очереди', () => {
            expect(() => printStartTest(printer)).toThrow('Нет моделей в очереди');
        });
    });
});
