import type { colors } from "./types";
export function generateID(): string {
    const min = 10;
    const max = 10000000;

    const random = Math.random();
    return String(Math.floor(random * (max - min + 1)) + min);
}



export class PrintError extends Error {
    figure: Figure;
    remainingPlastic: number;

    constructor(figure: Figure, remainingPlastic: number) {
        super(`Ошибка при печати ${figure.name}: недостаточно пластика. Остаток: ${remainingPlastic} мм.`);
        this.figure = figure;
        this.remainingPlastic = remainingPlastic;
    }
}

export class HeatPrinterError extends Error {
    printer: Printer;

    constructor(printer: Printer) {
        super(`${printer.name} перегрелся.`);
        this.printer = printer;
    }
}

export class Coil {
    readonly id: string;
    readonly name: string;
    readonly material: string;
    readonly color: colors;
    printerId: string | null;
    length: number;
    constructor(name: string, color: colors, length: number, printerId?: string | null, id?: string){
        this.name = name;
        this.material = 'Пластик'
        this.color = color;
        this.length = length;
        if(id) {
            this.id = id;
        }else {
            this.id = generateID();
        }
        if(printerId) {
            this.printerId = printerId
        }else {
            this.printerId = null;
        }
    }

    changeLength(changedLength: number) {
        if(changedLength > this.length){
            console.log('Нить слишком короткая')
        }else{
            this.length -= changedLength;
        }
    }
}

export class Figure {
    readonly id: string;
    name: string;
    perimeter: number;
    time: number;
    status: 'создан' | 'в печати' | 'готовый';
    color: colors | null;
    constructor(name: string, perimeter: number, time: number, color: colors | null, status?: 'создан' | 'в печати' | 'готовый',   id?: string){
        this.name = name;
        this.perimeter = perimeter;
        this.time = time;
        this.color = color;
        if(id) {
            this.id = id;
        }else {
            this.id = generateID();
        }
        if(status) {
            this.status = status
        }else{
            this.status = 'создан';
        }
    }
}

export class Printer {
    readonly id: string;
    name: string;
    printSpeed: number;
    coil: Coil | null;
    queue: Figure[];
    isPrinting: boolean
    constructor(name: string, printSpeed: number, coil: Coil | null, queue: Figure[], id?: string){
        this.name = name;
        this.coil = coil;
        this.queue = queue;
        this.isPrinting = false;
        this.printSpeed = printSpeed;
        if (id) {
            this.id = id
        }else {
            this.id = generateID();
        }
        
    }
}


