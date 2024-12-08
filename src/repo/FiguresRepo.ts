import { Figure } from "@/classes";
import axios from "axios";
import type { figureObject } from "@/types";

export class FigureRepo {
    async get () {
        try {
            const response = await axios.get('http://localhost:3000/figures');
            return (response.data as figureObject[]).map(item => new Figure(item.name, item.perimeter, item.time, item.color, item.status, item.id));
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    async create(data: Figure) {
        try {
            axios.post('http://localhost:3000/figures', data);
        } catch(e) {
            console.error(String(e));
        }
    }

    async update(data: Figure) {
        try {
            axios.put(`http://localhost:3000/figures/${data.id}`, data);
        } catch (e) {
            console.error(String(e));
        }
    }

    async delete(figure: Figure) {
        try {
            axios.delete((`http://localhost:3000/figures/${figure.id}`))
        } catch (e) {
            console.error(String(e))
        }
    } 
}