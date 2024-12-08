<script setup lang="ts">
import { ref, computed } from 'vue';
import { Figure } from '@/classes';
import FiguresList from './figures/FiguresList.vue';
import { useFigures} from '@/hooks/useFigures';
import { usePrinters } from '@/hooks/usePrinters';
import { formatDiagnostic } from 'typescript';

const {figures, addFigure, deleteFigure} = useFigures();
const {printers} = usePrinters();

let dialogVisible = ref(false);
const popupVisible = ref(false);

let lengthError = ref<null | string>(null);
let timeError = ref<null | string>(null);

const createdFigures = computed(() =>
  figures.value.filter((item) => item.status === 'создан').sort((a, b) => a.name.localeCompare(b.name))
);
const inQueueFigures = computed(() =>
  figures.value.filter((item) => item.status === 'в печати').sort((a, b) => a.name.localeCompare(b.name))
);
const printedFigures = computed(() =>
  figures.value.filter((item) => item.status === 'готовый').sort((a, b) => a.name.localeCompare(b.name))
);

const formData = {
    name: '',
    perimeter: 0,
    time: 0,
}

function create(figure: Figure) {
    addFigure(figure);
}

function delFig(figure: Figure) {
    for(const printer of printers.value) {
        if(printer.queue.length > 0){
            for(const queueFigure of printer.queue) {
                if(queueFigure.id === figure.id){
                    popupVisible.value = true;
                    return;
                }
            }
        }
    }
    deleteFigure(figure);
}

function createFigure() {
    if(formData.time <= 0 || formData.perimeter <= 0) {
        if(formData.perimeter <= 0) {
            lengthError.value = 'Периметр должен быть положительным';
        }
        if(formData.time <= 0) {
            timeError.value = 'Время должно быть положительным';
        }
        return;
    }
    const newFigure = new Figure(formData.name, Number(formData.perimeter), Number(formData.time), null);
    addFigure(newFigure);
    dialogVisible.value = false; 
}

function showDialog() {
    timeError.value = null;
    lengthError.value = null;
    dialogVisible.value = true;
}
</script>

<template>
    <div class="wrapper">
        <div class="elem_wrapper">
            <h2 class="title">Созданные</h2>
            <FiguresList class="figure__list" @copy="create" @delete="delFig" :figures="createdFigures" />
        </div>
        <div class="elem_wrapper">
            <h2 class="title">В очереди</h2>
            <FiguresList class="figure__list" @copy="create" @delete="delFig" :figures="inQueueFigures" />
        </div>
        <div class="elem_wrapper">
            <h2 class="title">Готовые</h2>
            <FiguresList class="figure__list" @copy="create" @delete="delFig" :figures="printedFigures" />
        </div>  
    </div>
    <Popup v-model:show="popupVisible">
        <p>Чтобы удалить эту фигурку, удалите ее из очереди</p>
    </Popup>

    <UIButton class="addbtn" @click="showDialog">Созать модель</UIButton>
    
    
    <UIModal v-model:show="dialogVisible">
        <form @submit.prevent>
            <h4 class="form__text">Создание модели</h4>
            <p class="label">Имя</p>
            <UIInput
            placeholder="Имя модели"
            required type="text"
            v-model="formData.name"
            />
            <p class="label">Периметр</p>
            <UIInput
            placeholder="Периметр"
            required type="number"
            v-model="formData.perimeter"
            />
            <p v-if="lengthError" style="color: red">{{ lengthError }}</p>
            <p class="label">Время создания</p>
            <UIInput
            placeholder="Время создания"
            type="number"
            v-model="formData.time"
            />
            <p v-if="timeError" style="color: red">{{ timeError }}</p>
            <UIButton @click="createFigure" class="modal__button">Создать</UIButton>
        </form>
        
    </UIModal>
</template>

<style scoped>
    .label {
        margin-top: 10px;
    }
    .modal__button{
        margin-top: 20px;
    }
    .addbtn {
        margin: 20px 20px ;
    }
    .wrapper {
        display: flex;
        justify-content: space-between;
    }

    .elem_wrapper {
        width: 100%;
    }

    .title {
        margin: 0 auto;
        width:fit-content;
        margin-top: 20px;
    }

    .figure__list {
        width: 98%;
        margin: 0 auto;
        margin-top: 20px;
    }

    .figure__list li {
        width: 100%;
    }
</style>