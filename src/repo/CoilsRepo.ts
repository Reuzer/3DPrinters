import type { coilObject } from "@/types";
import axios from "axios";
import { Coil } from "@/classes";

export class CoilRepo {
    async get() {
        try {
            const response = await axios.get('http://localhost:3000/coils');
            return (response.data as coilObject[]).map(item => new Coil(item.name, item.color, item.length, item.printerId, item.id));
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    async create(data: Coil) {
        try {
            axios.post('http://localhost:3000/coils', data);
        } catch (e) {
            console.error(String(e));
        }
    }

    async update(data: Coil) {
        try {
            axios.put(`http://localhost:3000/coils/${data.id}`, data);
        }catch(e) {
            console.error(String(e));
        }
    }

    async delete(data: Coil) {
        try {
            axios.delete(`http://localhost:3000/coils/${data.id}`)
        } catch(e) {
            console.error(String(e));
        }
    }
}
