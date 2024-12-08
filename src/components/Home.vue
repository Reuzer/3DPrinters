<script setup lang="ts">
import { Coil, Printer, Figure, PrintError, HeatPrinterError } from '@/classes';
import { ref, computed } from 'vue';
import PrinterList from '@/components/home/PrintersList.vue';
import FiguresList from './home/FiguresList.vue';
import CoilsList from './home/CoilsList.vue';
import { useFigures } from '@/hooks/useFigures';
import { useCoils } from '@/hooks/useCoils';
import { usePrinters } from '@/hooks/usePrinters';
import { FigureRepo } from '@/repo/FiguresRepo';
import { ignorableKeyModifiers } from 'node_modules/@vue/test-utils/dist/constants/dom-events';
import type { RefSymbol } from '@vue/reactivity';

const {figures, addFigure, updFigure, deleteFigure} = useFigures();
const {coils, create, updCoil, deleteCoil} = useCoils();
const {printers, addPrinter, updPrinter, destroyPrinter} = usePrinters();
let unsetCoils = ref<Coil[]>();

unsetCoils = computed(() => coils.value.filter((item) => !item.printerId));

const customErrorVisible = ref(false);
const customError = ref<string>('');
const successMessage = ref<{
    printerId: string,
    success: string,
}[]>([]);

function handlePrintResult(err: PrintError | HeatPrinterError | null | Error, success: Figure | null, printer: Printer) {
    if (err) {
        currentFigure.value.splice(currentFigure.value.indexOf(currentFigure.value.filter((obj) => obj.printerId === printer.id)[0]), 1);
        percentage.value.splice(percentage.value.indexOf(percentage.value.filter((obj) => obj.printerId === printer.id)[0]), 1);
        customError.value = `Ошибка: ${err.message}`;
        customErrorVisible.value = true;
    } else if (success) {
        let message = {
            printerId: printer.id,
            success: `Печать завершена: ${success.name}`
        }
        successMessage.value.push(message);
        setTimeout(() => {
            let index = successMessage.value.indexOf(message);
            successMessage.value.splice(index, 1);
        }, 2000)
    }
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

function deleteFigureFromPrinter(figure: Figure, printer: Printer) {
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

function removeCoilFromPrinter(printer: Printer) {
  printer.coil!.printerId = null;
    for(const figure of printer.queue) {
        figure.color = null;
        updFigure(figure);
    }
    updCoil(printer.coil!);
    printer.coil = null;
    updPrinter(printer);
}

const popupEmptyQueueVisible = ref(false);
const popupEmptyCoilVisible = ref(false)
const popupLengthVisible = ref(false);



const percentage = ref<{printerId: string, percentValue: number,}[]>([]);
const currentFigure = ref<{printerId: string, figure: Figure | null}[]>([]);

function printStart(callback: (err: PrintError | null | Error | HeatPrinterError, success: Figure | null, printer: Printer) => void, printer: Printer){
    if(printer.queue.length === 0) {
        throw new Error('Нет моделей в очереди');
    }

    if(!printer.coil) {
        throw new Error('Катушка не задана');
    }

    if (Math.random() < 0.3) {
        const err = new HeatPrinterError(printer);
        callback(err, null, printer);
        console.error('Принтер перегрелся');
    }

    printer.isPrinting = true;

    let currFigure: {printerId: string, figure: Figure | null} = {
        printerId: printer.id,
        figure: printer.queue.shift()!
    }
    currentFigure.value.push(currFigure);


    if(printer.coil!.length < currFigure.figure!.perimeter) {
        const err = new PrintError(currFigure.figure!, printer.coil!.length);
        currFigure.figure = null;
        callback(err, null, printer);
        return;
    }

    let progress = ref(0);

    let percent = {
        printerId: printer.id,
        percentValue: 0,
    }

    percentage.value.push(percent);

    let figurePerimeter = currFigure.figure!.perimeter;
    let intervalId = setInterval(() => {
        if(figurePerimeter >= printer.printSpeed) {
            progress.value += printer.printSpeed;
            figurePerimeter -= printer.printSpeed;
            printer.coil!.changeLength(printer.printSpeed);
            percent.percentValue = Math.round((progress.value / currFigure.figure!.perimeter) * 100 * 100) / 100;
            console.log(percentage.value);
            
        } else {
            progress.value += figurePerimeter;
            printer.coil!.changeLength(figurePerimeter);
            percent.percentValue = Math.round((progress.value/currFigure.figure!.perimeter) * 100 * 100) / 100;
        }

        if(percent.percentValue >= 100) {
            clearInterval(intervalId);
            currFigure.figure!.status = 'готовый';
            updFigure(currFigure.figure!);
            updCoil(printer.coil!);
            updPrinter(printer);
            callback(null, currFigure.figure, printer);
            let percentIndex = percentage.value.indexOf(percent);
            percentage.value.splice(percentIndex, 1);
            let currFigureIndex = currentFigure.value.indexOf(currFigure);
            currentFigure.value.splice(currFigureIndex, 1);
            if(printer.queue.length > 0) {
                printStart(handlePrintResult, printer);
            } else {
                printer.isPrinting = false;
                return;
            }
        }
    }, 1000)
}

function handlePrintStart(printer: Printer) {
    if(!printer.coil || printer.queue.length === 0 || printer.coil.length < printer.queue[0].perimeter) {
        if(!printer.coil) {
            popupEmptyCoilVisible.value = true;
        }
        if(printer.queue.length === 0) {
            popupEmptyQueueVisible.value = true;
        }
        if(printer.queue[0].perimeter > printer.coil!.length) {
            popupLengthVisible.value = true;
        }
        return;
    }

    printStart(handlePrintResult, printer);
}





</script>

<template>
  <div class="content">
    <PrinterList 
    :success="successMessage"
    :current-figure="currentFigure"
    :printers="printers"
    :unset-coils="unsetCoils!"
    :percentage="percentage"
    @add-coil-to-printer="addCoilToPrinter"
    @delete-figure-from-printer="deleteFigureFromPrinter"
    @remove-coil-from-printer="removeCoilFromPrinter"
    @start-printing="handlePrintStart"
    />
    <CoilsList :coils="coils" />
    <FiguresList :figures="figures" class="list"/>
  </div>
  <Popup v-model:show="popupEmptyQueueVisible">
    <p>Нет фигурок в очереди</p>
  </Popup>
  <Popup v-model:show="popupEmptyCoilVisible">
    <p>Пластик не поставлен</p>
  </Popup>
  <Popup v-model:show="popupLengthVisible">
    <p>Длины нити в пластике не хватает для печати</p>
  </Popup>
  <Popup v-model:show = "customErrorVisible">
    <p>{{ customError }}</p>
  </Popup> 
</template>

<style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    align-items: flex-start;
    margin: 0 auto;
    width: 90%;
  }
</style>