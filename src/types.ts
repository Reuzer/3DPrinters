import { Figure } from "./classes";

export type Link = 'printers' | 'coils' | 'figures';

export type colors = ('#DC143C' | '#C71585' | '#FF4500' | '#FFD700' | '#800080');

export type figureObject = {
    id: string;
    name: string;
    perimeter: number;
    time: number;
    color: colors | null;
    status: 'создан' | 'в печати' | 'готовый';
}

export type coilObject = {
    id: string;
    name: string;
    material: 'Пластик';
    color: colors;
    printerId: string | null;
    length: number;
}

export type printerObject = {
    id: string;
    name: string;
    printSpeed: number;
    coil: coilObject | null; 
    queue: figureObject[];
    isPrinting: boolean;
}

