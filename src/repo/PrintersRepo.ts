import { Printer, Coil, Figure } from "@/classes";
import axios from "axios";
import type { printerObject, coilObject, figureObject } from "@/types";

function toCoil(coil: coilObject | null) {
    if(coil){
        return new Coil(coil.name, coil.color, coil.length, coil.printerId, coil.id);
    }else {
        return null
    }
}

function toFigure(arr: figureObject[]){
    return arr.map(item => new Figure(item.name, item.perimeter, item.time, item.color, item.status, item.id))
}

export class PrinterRepo {
    async get () {
        try {
            const response = await axios.get('http://localhost:3000/printers');
            return (response.data as printerObject[]).map(item => new Printer(item.name, item.printSpeed, toCoil(item.coil), toFigure(item.queue), item.id));
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    async create(data: Printer) {
        try {
            axios.post(`http://localhost:3000/printers`, data)
        } catch(e) {
            console.error(String(e));
        }
    }

    async update(data: Printer) {
        try {
            axios.put(`http://localhost:3000/printers/${data.id}`, data)
        } catch(e) {
            console.error(String(e));
        }
    }

    async delete(data: Printer) {
        try {
            axios.delete(`http://localhost:3000/printers/${data.id}`)
        } catch (e) {
            console.error(String(e));
        }
    }
    
}