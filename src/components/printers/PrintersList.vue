<script setup lang="ts">
import { Printer, Coil, Figure } from '@/classes';
import { ref } from 'vue';
import type { Ref } from 'vue';
import PrintersItem from '../printers/PrintersItem.vue';
const props = defineProps<{
     printers: Printer[],
     unsetCoils: Coil[],
     unsetFigures: Figure[],
    }>();
const emit = defineEmits<{
    (e: 'addCoilToPrinter', coil: Coil, printer: Printer): void,
    (e: 'deleteCoilFromPrinter', coil: Printer): void,
    (e: 'addFigureToQueue',  printer: Printer, figures: Figure[]): void,
    (e: 'deletePrinter', printer: Printer): void,
    (e: 'deleteFigureFromQueue', figure: Figure, printer: Printer): void,
}>()

const addCoilDialogVisible = ref(false);
const addFigureDialogVisible = ref(false);
const currentPrinter = ref<Printer>();


const addFigureToQueueData = ref<Figure[]>([]);
let addCoilToPrinterData = ref<Coil>();

function toggleSelection(figure: Figure) {
    const index = addFigureToQueueData.value!.findIndex((item) => item.id === figure.id);
      if (index === -1) {
        addFigureToQueueData.value!.push(figure);
      } else {
        addFigureToQueueData.value!.splice(index, 1);
      }
}

function showAddCoilDialog(printer: Printer) {
    currentPrinter.value = printer;
    addCoilDialogVisible.value = true;
}

function showAddFigureDialog(printer: Printer) {
    currentPrinter.value = printer;
    addFigureDialogVisible.value = true;
}

function deleteCoilFromPrinter(printer: Printer) {
    emit('deleteCoilFromPrinter', printer);
}

function deletePrinter(printer: Printer) {
    emit('deletePrinter', printer);
}

function addCoilToPrinter() {
    emit('addCoilToPrinter', addCoilToPrinterData.value!, currentPrinter.value!);
    addCoilDialogVisible.value = false;
}

function addFigureToQueue() {
    emit('addFigureToQueue',  currentPrinter.value!, addFigureToQueueData.value!);
    addFigureDialogVisible.value = false;
}

function deleteFigureFromQueue(figure: Figure, printer: Printer) {
    emit('deleteFigureFromQueue', figure, printer);
}



</script>

<template>
    <div class="content">
        <h2>Printers</h2>
        <ul v-if="printers.length > 0" class="list">
            <PrintersItem 
            v-for="printer in printers" 
            :key="printer.id" 
            :printer="printer"
            >
            <template #default="{ printer }">
                <p class="desc">Пластик: 
                    <span 
                    class="coil" 
                    v-if="printer.coil" 
                    :style="{ borderColor: printer.coil.color }">
                        {{ printer.coil.name }}
                        <img src="../../assets/coil.svg">
                    </span>
                    <span class="coil" v-else>не поставлен</span>
                </p>
                <p class="desc">Скорость: {{ printer.printSpeed }}</p>
                <div class="desc">
                    Очередь:
                    <div class="queue__elem" v-if="printer.queue.length > 0" v-for="figure in printer.queue">
                        <div class="queue__item">
                            <p>{{ figure.name }}</p>
                            <img src="../../assets/figure.svg" alt="">
                        </div>
                        <button class="delete-button" @click="deleteFigureFromQueue(figure, printer)"><img src="../../assets/delete.svg" class="delete-svg" alt=""></button>
                    </div>
                    <div class="queue__elem" v-else>Очередь пуста</div>
                </div>
                <div class="actions">
                    <UIButton v-show="!printer.coil" @click="showAddCoilDialog(printer)">Добавить катушку</UIButton>
                    <UIButton v-show="printer.coil" @click="deleteCoilFromPrinter(printer)">Удалить катушку</UIButton>
                    <UIButton @click="showAddFigureDialog(printer)">Добавить в очередь</UIButton>
                    <UIButton @click="deletePrinter(printer)">Удалить</UIButton>
                </div>
            </template>
            </PrintersItem>
            <UIModal v-model:show="addCoilDialogVisible">
                <select class="coil__select" v-model="addCoilToPrinterData">
                    <option v-for="coil in unsetCoils" :value="coil">{{ coil.name }}</option>
                </select>
                <UIButton @click="addCoilToPrinter()" class="add_coil">Добавить</UIButton>
            </UIModal>
            <UIModal v-model:show="addFigureDialogVisible">
                <div class="figures">
                    <div class="checkbox__wrapper" v-for="figure in unsetFigures" :key="figure.id">
                        <input type="checkbox"
                        :value="figure"
                        @change="toggleSelection(figure)"
                        >
                        <p>{{ figure.name }} {{ figure.perimeter }}</p>
                    </div>
                </div>
                <UIButton @click="addFigureToQueue">Добавить</UIButton>
            </UIModal>

        </ul>
        <h2 v-else>Нет данных о принтерах</h2>
    </div>
    
</template>


<style scoped>
    .add_coil {
        margin-top: 10px;
    }
    .coil__select {
        display: block;
        width: 70%;
        padding: 10px;
        border: 2px solid teal;
        border-radius: 6px;
    }
    .checkbox__wrapper {
        display: flex;
        gap: 10px;
    }

    .queue__elem{
        display: flex;
        flex-wrap:wrap;
        margin-bottom: 20px;
        
    }

    .delete-svg {
        width: 22px;
        height: 19px;
        margin: 0;
    }

    .delete-button{
        display: inline-flex;
        align-items: center;
        justify-content: center; 
        padding: 0; 
        cursor: pointer;
        margin-left: 10px;
    }


    .queue__item {
        display:flex;
        font-size: 24px;
        padding: 10px;
        border: 2px solid black;
        border-radius: 8px;
        width: 48%;
        justify-content: space-between;
    }
    .desc {
        text-align: left;
        margin-top: 10px;
        font-size: 18px;
        margin-left: 10px;
    }

    .coil {
        margin-top: 8px;
        display:flex;
        font-size: 24px;
        padding: 10px;
        border: 3px solid black;
        border-radius: 8px;
        width: auto;
        justify-content: space-between;

    }
    .content{
        margin-top: 30px;
        margin-left: 20px;
        padding: 20px;
        border: 1px solid #25ddd4;
        border-radius: 8px;
        width: 90%;
        display: flex;
        flex-direction: column; 
        gap: 20px; 
    }

    .list {
        display: flex;
        flex-wrap: wrap; /* Разрешить перенос элементов, если их много */
        gap: 10px; /* Отступ между элементами списка */
        width: 100%; /* Занять всю ширину родителя */
    }

    .list .element {
        flex: 1; /* Заставить элементы растягиваться равномерно */
        min-width: 100px; /* Минимальная ширина для предотвращения слишком узкого сжатия */
        max-width: calc(50% - 10px); /* Максимальная ширина, чтобы 2 элемента умещались в строке */
        box-sizing: border-box; /* Учитывать padding и border в ширине элемента */
    }

    .item {
        padding: 10px;
        border: 2px solid #333;
        border-radius: 8px;
        text-align: center;
    }

    .actions {
        display: flex;
        justify-content: left;
        margin-top: 40px;
        flex-wrap: wrap;
        gap:10px;
    }
</style>