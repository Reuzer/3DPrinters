<script setup lang="ts">
import { Coil, Printer, Figure } from '@/classes';
import PrintersList from './printers/PrintersList.vue';
import { usePrinters } from '@/hooks/usePrinters';
import { useCoils } from '@/hooks/useCoils';
import { useFigures } from '@/hooks/useFigures';
import { computed, ref } from 'vue';
const { printers, addPrinter, updPrinter, destroyPrinter } = usePrinters();
const { coils, create, updCoil, deleteCoil } = useCoils();
const {figures, addFigure, updFigure, deleteFigure } = useFigures();

let unsetCoils = ref<Coil[]>();
let unsetFigures = ref<Figure[]>();

let speedError = ref<string | null>(null)

unsetCoils = computed(() => coils.value.filter((item) => !item.printerId)); 
unsetFigures = computed(() => figures.value.filter((item) => item.status === 'создан'))
let formData = ref<{
    name: string,
    printSpeed: number,
    coil: Coil | null,
    queue: Figure[],
}>();

formData.value = {
    name: '',
    printSpeed: 0,
    coil: null,
    queue: [],
}


const dialogVisible = ref(false);
const popupCoilVisisbe = ref(false);
const popupQueueVisible = ref(false);

function showDialog() {
    dialogVisible.value = true;
}

function toggleSelection(figure: Figure) {
    const index = formData.value!.queue.findIndex((item) => item.id === figure.id);
      if (index === -1) {
        formData.value!.queue.push(figure); // Добавить в очередь
      } else {
        formData.value!.queue.splice(index, 1); // Удалить из очереди
      }
}

function createPrinter() {
    if(formData.value!.printSpeed <= 0){
        speedError.value = 'Скорость должна быть положительной';
        return;
    }
    const newPrinter = new Printer(formData.value!.name, Number(formData.value!.printSpeed), formData.value!.coil, formData.value!.queue);
    if(newPrinter.coil && newPrinter.queue.length > 0){
        for (const figure of newPrinter.queue) {
            figure.color = newPrinter.coil.color;
            figure.status = 'в печати';
            updFigure(figure);
        }
    }
    addPrinter(newPrinter);
    dialogVisible.value = false;
}


function addCoilToPrinter(coil: Coil, printer: Printer) {
    printer.coil = coil;
    coil.printerId = printer.id;
    if(printer.queue.length > 0) {
        for(const figure of printer.queue) {
            figure.color = coil.color;
            updFigure(figure);
        }
    }
    updCoil(coil);
    updPrinter(printer);
}

function deleteCoilFromPrinter(printer: Printer) {
    printer.coil!.printerId = null;
    for(const figure of printer.queue) {
        figure.color = null;
        updFigure(figure);
    }
    updCoil(printer.coil!);
    printer.coil = null;
    updPrinter(printer);
}

function deletePrinter(printer: Printer) {
    if(printer.coil) {
        popupCoilVisisbe.value = true;
        return;
    } else if(printer.queue.length > 0) {
        popupQueueVisible.value = true;
        return;
    }
    destroyPrinter(printer);
}

function AddFigureToQueue(printer: Printer, figures: Figure[]) {
    for( const figure of figures) {
        if(printer.coil) {
            figure.color = printer.coil.color;
        }else {
            figure.color = null;
        }
        figure.status = 'в печати';
        updFigure(figure);
        printer.queue.push(figure);
    }
    updPrinter(printer);
}

function deleteFigureFromQueue(figure: Figure, printer: Printer) {
    for(const queueFigure of printer.queue) {
        if (queueFigure === figure) {
            figure.color = null;
            figure.status = 'создан';
            const index = printer.queue.indexOf(figure);
            printer.queue.splice(index, 1);
        }
    }

    updPrinter(printer);
    updFigure(figure);
}

</script>

<template>
    <PrintersList 
    @add-coil-to-printer="addCoilToPrinter" 
    @delete-coil-from-printer="deleteCoilFromPrinter" 
    @delete-printer="deletePrinter" 
    @add-figure-to-queue="AddFigureToQueue"
    @delete-figure-from-queue="deleteFigureFromQueue" 
    class="printerList" :printers="printers" :unset-coils="unsetCoils!" :unset-figures="unsetFigures!"/>
    <UIButton class="add__btn" @click="showDialog">Создать принтер</UIButton>
    <UIModal v-model:show="dialogVisible">
        <form @submit.prevent>
            <h4 class="form__text">Создание принтера</h4>
            <p class="label">Имя</p>
            <UIInput
            placeholder="Имя принтера"
            required type="text"
            minlength="3"
            v-model="formData!.name"
            /> 
            <p class="label">Скорость</p>
            <UIInput
            placeholder="Скорость печати"
            required type="number"
            v-model="formData!.printSpeed"
            />
            <p v-if="speedError" style="color: red">{{ speedError }}</p>
            <p class="label">Пластик</p>
            <select class="coil__select" v-model="formData!.coil">
                <option :value="null">Не стоит</option>
                <option v-for="coil of unsetCoils" :value="coil">{{ coil.name }}</option>
            </select>
            <p class="label">Модели</p>
            <div class="figures">
                <div class="checkbox__wrapper" v-for="figure in unsetFigures" :key="figure.id">
                    <input type="checkbox"
                    :value="figure"
                    @change="toggleSelection(figure)"
                    >
                    <p>{{ figure.name }} {{ figure.perimeter }}</p>
                </div>
            </div>
            <UIButton @click="createPrinter" class="modal__button">Создать</UIButton>
        </form>
    </UIModal>
    <Popup v-model:show="popupCoilVisisbe">
        <p>Сначала удалите катушку</p>
    </Popup>
    <Popup v-model:show="popupQueueVisible">
        <p>Сначала удалите все фигурки из очереди</p>
    </Popup>
</template>

<style scoped>
    .label { 
        margin-top: 10px;
    }
    .figures {
        margin-top: 10px;
        margin-left: 8px;
    }
    .coil__select {
        margin-top: 10px;
    }
    .checkbox__wrapper {
        display: flex;
        gap: 10px;
    }

    .add__btn {
        margin-top: 20px;
        margin-left: 20px;
    }

    .modal__button {
        margin-top: 15px;
    }
</style>