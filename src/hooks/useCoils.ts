import { ref, onMounted } from "vue";
import { Coil } from "@/classes";
import { CoilRepo } from "@/repo/CoilsRepo";

const coilRepo = new CoilRepo();

export function useCoils() {

    const coils = ref<Coil[]>([])

    async function fetching () {
        try {
            const response = await coilRepo.get();
            if(response){
                coils.value = response;
            }
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    async function create (coil: Coil) {
        try {
            coilRepo.create(coil)
        } catch (e) {
            console.error(String(e));
        }
    }

    async function updCoil(coil: Coil) {
        try {
            coilRepo.update(coil);
        } catch(e) {
            console.error(String(e));
        }
    }

    async function deleteCoil(coil: Coil) {
        try {
            coilRepo.delete(coil);
        } catch(e) {
            console.error(String(e));
        }
    }
        

    onMounted(() => {
        fetching(); // Первоначальная загрузка
        let intervalId = setInterval(fetching, 1000); // Обновляем данные каждые 5 секунд
      });
      
    return {
        coils, create, updCoil, deleteCoil,
    }
}