import { mount } from '@vue/test-utils';
import PrintersList from '@/components/home/PrintersList.vue';
import { Printer, Coil, Figure } from '@/classes';
import { describe, it, expect } from 'vitest';

describe('PrintersList Component', () => {
  it('должен корректно отображать список принтеров', () => {
    const printers = [
      new Printer('Printer1', 50, null, []),
      new Printer('Printer2', 30, null, [])
    ];

    const wrapper = mount(PrintersList, {
      props: { 
        printers, 
        unsetCoils: [], 
        percentage: [], 
        currentFigure: [], 
        success: [], 
      }
    });

    expect(wrapper.findAll('.list > li').length).toBe(printers.length);
  });

  it('должен отображать очередь принтера', () => {
    const figure = new Figure('Cube', 100, 20, '#800080');
    const printers = [new Printer('Printer1', 50, null, [figure])];

    const wrapper = mount(PrintersList, {
      props: { 
        printers, 
        unsetCoils: [], 
        percentage: [], 
        currentFigure: [], 
        success: []
      }
    });

    expect(wrapper.find('.queue__item').text()).toContain(figure.name);
  });

  it('должен отображать сообщение об отсутствии принтеров', () => {
    const wrapper = mount(PrintersList, {
      props: { 
        printers: [], 
        unsetCoils: [], 
        percentage: [], 
        currentFigure: [], 
        success: [] 
      }
    });

    expect(wrapper.text()).toContain('Нет данных о принтерах');
  });

  it('должен отображать процент выполнения', () => {
    const printers = [new Printer('Printer1', 50, null, [])];
    const wrapper = mount(PrintersList, {
      props: { 
        printers, 
        unsetCoils: [], 
        percentage: [{
          printerId: printers[0].id,
          percentValue: 75,
        }], 
        currentFigure: [], 
        success: []
      }
    });
  
    expect(wrapper.find('.percent').text()).toBe('75%');
  });
});
