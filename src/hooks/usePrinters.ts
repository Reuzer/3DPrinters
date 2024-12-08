import { ref, onMounted } from "vue";
import { Printer } from "@/classes";
import { PrinterRepo } from "@/repo/PrintersRepo";

const printerRepo = new PrinterRepo;

export function usePrinters() {
    const printers = ref<Printer[]>([]);

    async function fetching () {
        try {
            const response = await printerRepo.get();
            if(response){
                printers.value = response;
            }
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    function addPrinter(printer: Printer) {
        try {
            printerRepo.create(printer)
        } catch(e) {
            console.error(String(e))
        }
    }

    function updPrinter(printer: Printer) {
        try {
            printerRepo.update(printer);
        }catch(e) {
            console.error(String(e))
        }
    }

    function destroyPrinter(printer: Printer) {
        try {
            printerRepo.delete(printer);
        }catch(e) {
            console.error(String(e))
        }
    }

    onMounted(() => {
        fetching();
        let intervalId = setInterval(fetching, 1000);
      });
    return {
        printers, addPrinter, updPrinter, destroyPrinter
    }
}