import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FiguresList from '@/components/figures/FiguresList.vue';
import { Figure } from '@/classes';

describe('FigureList.vue', () => {
  const mockFigures: Figure[] = [
    new Figure('Square', 40, 60, '#800080', 'создан', '1'),
    new Figure('Circle', 20, 30, '#C71585', 'в печати', '2'),
    new Figure('Triangle', 50, 90, null, 'готовый', '3'),
  ];

  it('Отображает список фигур, если данные присутствуют', () => {
    const wrapper = mount(FiguresList, {
      props: { figures: mockFigures },
    });

    const items = wrapper.findAll('.item');

    expect(items.length).toBe(mockFigures.length);
    mockFigures.forEach((figure, index) => {
      expect(items[index].text()).toContain(figure.name);
      expect(items[index].text()).toContain(`Периметр: ${figure.perimeter}`);
      expect(items[index].text()).toContain(`Время: ${figure.time}`);
    });
  });

  it('Показывает сообщение о пустоте, если список пуст', () => {

    const wrapper = mount(FiguresList, {
      props: { figures: [] },
    });

    const content = wrapper.text();

    expect(content).toContain('Нет данных о фигурках');
  });

  it('Сортирует фигуры по имени', () => {
    const unsortedFigures = [...mockFigures].sort((a, b) => a.name.localeCompare(b.name));
    const wrapper = mount(FiguresList, {
      props: { figures: unsortedFigures },
    });

    const items = wrapper.findAll('.item');
    const displayedNames = items.map(item => item.text());

    const sortedNames = [...mockFigures].sort((a, b) => a.name.localeCompare(b.name)).map(f => f.name);

    sortedNames.forEach((name, index) => {
      expect(displayedNames[index]).toContain(name);
    });
  });

  it('Эмитирует событие удаления', async () => {
    const wrapper = mount(FiguresList, {
      props: { figures: mockFigures },
    });

    const deleteButton = wrapper.findAll('.delete__btn').at(0);

    await deleteButton?.trigger('click');

    expect(wrapper.emitted('delete')).toHaveLength(1);
    expect(wrapper.emitted('delete')?.[0]).toEqual([mockFigures[0]]);
  });
});
