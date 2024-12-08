import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FigureItem from '@/components/figures/FigureItem.vue';
import { Figure } from '@/classes';

describe('FigureItem.vue', () => {
  const mockFigure = new Figure('Square', 40, 60, '#C71585', 'создан', '1');

  it('Отображает информацию о фигуре', () => {
    // Arrange
    const wrapper = mount(FigureItem, {
      props: { figure: mockFigure },
    });

    // Act
    const content = wrapper.text();

    expect(content).toContain('Square');
    expect(content).toContain(`Периметр: ${mockFigure.perimeter}`);
    expect(content).toContain(`Время: ${mockFigure.time}`);
  });

  it('Устанавливает цвет границы на основе фигуры', () => {
    // Arrange
    const wrapper = mount(FigureItem, {
      props: { figure: mockFigure },
    });

    // Act
    const item = wrapper.find('.item');
    const style = item.attributes('style');

    // Assert
    expect(style?.toLowerCase()).toContain(`border-color: ${mockFigure.color?.toLowerCase()}`);
  });

  it('Устанавливает цвет границы в черный, если цвет не задан', () => {
    
    const figureWithoutColor = new Figure('Circle', 20, 30, null, 'готовый', '2');
    const wrapper = mount(FigureItem, {
      props: { figure: figureWithoutColor },
    });

    
    const item = wrapper.find('.item');
    const style = item.attributes('style');

    
    expect(style).toContain('border-color: black');
  });
});
