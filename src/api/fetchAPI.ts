import axios from "axios";
import type { Link, printerObject, coilObject} from "@/types";
import { Printer, Coil, Figure } from "@/classes";

export class DB {
    async get(link:Link): Promise<(printerObject | coilObject | Figure)[]> {
        return await axios.get(`http://localhost:3000/${link}`);
    }
    create(link: Link, data: Printer | Coil | Figure) {
        axios.post(`http://localhost:3000/${link}`, data);
    }

    update(link: Link, id: number,  data: {[key: string]: (number | string | Coil | Figure[])}) {
        axios.patch(`http://localhost:3000/${link}/${id}`, data)
    }

    delete (link: Link, id:number) {
        axios.delete(`http://localhost:3000/${link}/${id}`)
    }
}