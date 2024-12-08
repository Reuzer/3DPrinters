import { describe, it, expect, vi } from 'vitest';
import { Figure, generateID } from '@/classes'; 
import type { colors } from '@/types';

const randomId: string = generateID();

describe('Инициализация', () => {
    it('Правильная инициализация всех полей с заданными параметрами', () => {
      const figure = new Figure(
        'Square',
        40,
        60,
        '#800080',
        'в печати',
        'custom-id'
      );


      expect(figure.name).toBe('Square');
      expect(figure.perimeter).toBe(40);
      expect(figure.time).toBe(60);
      expect(figure.color).toBe('#800080');
      expect(figure.status).toBe('в печати');
      expect(figure.id).toBe('custom-id');
    });

    it('Генерация ID при отсутствии явного значения', () => {
      const figure = new Figure('Circle', 20, 30, '#800080');


      expect(typeof figure.id).toBe(typeof randomId);
    });

    it('Установка статуса по умолчанию как "создан", если он не задан', () => {
      const figure = new Figure('Triangle', 50, 90, null);

      expect(figure.status).toBe('создан');
    });

    it('Правильная работа при отсутствии цвета (color=null)', () => {
      const figure = new Figure('Hexagon', 100, 120, null, 'готовый');

      expect(figure.color).toBeNull();
      expect(figure.status).toBe('готовый');
    })
});