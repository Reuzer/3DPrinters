import { ref, onMounted } from "vue";
import { Figure } from "@/classes";
import { FigureRepo } from "@/repo/FiguresRepo";

const figureRepo = new FigureRepo;

export function useFigures() {
    const figures = ref<Figure[]>([]);

    async function fetching () {
        try {
            const response = await figureRepo.get();
            if(response){
                figures.value = response;
            }
        } catch(e) {
            if(e instanceof Error){
                console.error(e.message);
            }else{
                console.error(String(e));
            }
        }
    }

    function addFigure(figure: Figure) {
        try {
            figureRepo.create(figure);
        } catch(e) {
            console.error(String(e));
        }
    }

    function updFigure(figure: Figure) {
        try {
            figureRepo.update(figure)
        } catch(e) {
            console.error(String(e));
        }
    }

    function deleteFigure(figure: Figure) {
        figureRepo.delete(figure);
    }

    onMounted(() => {
        fetching(); // Первоначальная загрузка
        let intervalId = setInterval(fetching, 1000); // Обновляем данные каждые 5 секунд
      });
    return {
        figures, addFigure, updFigure, deleteFigure,
    }
}