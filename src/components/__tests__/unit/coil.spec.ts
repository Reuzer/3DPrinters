import { describe, it, expect, vi } from 'vitest';
import { Coil, generateID } from '@/classes';
import type { colors } from '@/types';

const randomId: string = generateID()

describe('Coil', () => {
  describe('Инициализация', () => {
    it('Правильная инициализация всех полей', () => {
      const coil = new Coil('TestCoil', '#C71585' , 100, 'printer-123', 'custom-id');
      
      expect(coil.name).toBe('TestCoil');
      expect(coil.material).toBe('Пластик');
      expect(coil.color).toBe('#C71585');
      expect(coil.length).toBe(100);
      expect(coil.printerId).toBe('printer-123');
      expect(coil.id).toBe('custom-id');
    });

    it('Генерация ID при отсутствии явного значения', () => {
      const coil = new Coil('TestCoil','#800080', 200);

      expect(typeof coil.id).toBe(typeof randomId);
    });

    it('Установка printerId как null при отсутствии значения', () => {
      const coil = new Coil('TestCoil', '#DC143C', 50);

      expect(coil.printerId).toBeNull();
    });
  });

  describe('Метод changeLength', () => {
    it('Уменьшает длину при достаточной длине', () => {
      const coil = new Coil('TestCoil', '#800080', 100);
      coil.changeLength(40);

      expect(coil.length).toBe(60);
    });

    it('Не изменяет длину, если заданное значение превышает оставшуюся длину', () => {
      const coil = new Coil('TestCoil', '#FFD700', 30);
      const consoleSpy = vi.spyOn(console, 'log');

      coil.changeLength(50);

      expect(coil.length).toBe(30);
      expect(consoleSpy).toHaveBeenCalledWith('Нить слишком короткая');
    });
  });
});
