import { describe, it, expect, vi } from 'vitest';
import { Printer, Coil, Figure, generateID } from '@/classes';

const randomId = generateID();

describe('Инициализация', () => {
    it('Правильная инициализация всех полей', () => {
      const coil = new Coil('TestCoil', '#C71585', 100); 
      const figure = new Figure('TestFigure', 40, 60, '#C71585'); 
      const queue = [figure]; 

      const printer = new Printer('TestPrinter', 50, coil, queue, 'custom-id');

      expect(printer.name).toBe('TestPrinter');
      expect(printer.printSpeed).toBe(50);
      expect(printer.coil).toBe(coil);
      expect(printer.queue).toEqual(queue);
      expect(printer.isPrinting).toBe(false);
      expect(printer.id).toBe('custom-id');
    });

    it('Генерация ID при отсутствии явного значения', () => {
      const printer = new Printer('TestPrinter', 60, null, []);

      expect(typeof printer.id).toBe(typeof randomId);
    });

    it('Инициализация с пустой катушкой и очередью', () => {
      const printer = new Printer('EmptyPrinter', 30, null, []);

      expect(printer.name).toBe('EmptyPrinter');
      expect(printer.printSpeed).toBe(30);
      expect(printer.coil).toBeNull();
      expect(printer.queue).toEqual([]);
      expect(printer.isPrinting).toBe(false);
    });
  });