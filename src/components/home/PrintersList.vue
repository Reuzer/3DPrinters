<script setup lang="ts">
import { Printer, Coil, Figure } from '@/classes';
import PrintersItem from '../printers/PrintersItem.vue';
import { ref } from 'vue';

const props = defineProps<{ 
    printers: Printer[],
    unsetCoils: Coil[],
    percentage: {
        printerId: string,
        percentValue: number,
    }[],
    currentFigure: {
        printerId: string,
        figure: Figure | null,
    }[],
    success: {
        printerId: string,
        success: string,
    }[],    
}>();

const addCoilToPrinterData = ref<Coil>();
const dialogVisible = ref(false);

const currentPrinter = ref<Printer>();

const emit = defineEmits<{
    (e: 'removeCoilFromPrinter', printer: Printer): void,
    (e: 'addCoilToPrinter', coil: Coil, printer: Printer): void,
    (e: 'deleteFigureFromPrinter', figure: Figure, printer: Printer): void,
    (e: 'startPrinting', printer: Printer): void,
}>();


function deleteFigureFromPrinter(figure: Figure, printer: Printer) {
    emit('deleteFigureFromPrinter', figure, printer);
}

function addCoilToPrinterShow(printer: Printer) {
    dialogVisible.value = true;
    currentPrinter.value = printer;
}

function addCoilToPrinter() {
    emit('addCoilToPrinter', addCoilToPrinterData.value!, currentPrinter.value!);
    dialogVisible.value = false;
}

function deleteCoilFromPrinter(printer: Printer) { 
    emit('removeCoilFromPrinter', printer);
}

function handleStartPrint(printer: Printer) {
    emit('startPrinting', printer);
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
                        <button class="delete-button" @click="deleteFigureFromPrinter(figure, printer)"><img src="../../assets/delete.svg" class="delete-svg" alt=""></button>
                    </div>
                    <div class="queue__elem" v-else>Очередь пуста</div>
                </div>
                <p v-if="currentFigure.length > 0 &&  currentFigure.filter((item) => item.printerId === printer.id)[0].printerId === printer.id">Изготавливается: {{ currentFigure.filter((item) => item.printerId === printer.id)[0].figure?.name }}</p>
                <p v-if="percentage.length > 0 && percentage.filter((item) => item.printerId === printer.id)[0].printerId === printer.id" class="percent">{{ percentage.filter((item) => item.printerId === printer.id)[0].percentValue }}%</p>
                <p v-if="success.length > 0 && success.filter((item) => item.printerId === printer.id)[0].printerId === printer.id">{{ success.filter((item) => item.printerId === printer.id)[0].success }}</p>
                <div class="actions">
                    <UIButton v-show="!printer.coil" @click="addCoilToPrinterShow(printer)">Добавить катушку</UIButton>
                    <UIButton v-show="printer.coil" @click="deleteCoilFromPrinter(printer)">Удалить катушку</UIButton>
                    <UIButton @click="handleStartPrint(printer)">Начать печать</UIButton>
                </div>
            </template>

            </PrintersItem>
            <UIModal v-model:show="dialogVisible">
                <select class="coil__select" v-model="addCoilToPrinterData">
                    <option v-for="coil in unsetCoils" :value="coil">{{ coil.name }}</option>
                </select>
                <UIButton @click="addCoilToPrinter()" class="add_coil_button">Добавить</UIButton>
            </UIModal>
        </ul>
        <h2 v-else>Нет данных о принтерах</h2>
    </div>
</template>


<style scoped>
    .percent {
        margin-top: 20px;
    }
    .coil__select {
        display: block;
        width: 70%;
        padding: 10px;
        border: 2px solid teal;
        border-radius: 6px;
    }

    .add_coil_button {
        margin-top: 10px;
    }

    .queue__elem{
        display: flex;
        flex-wrap:wrap;
        margin-bottom: 10px;
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
        padding: 20px;
        border: 1px solid #25ddd4;
        border-radius: 8px;
        width: 30%;
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