<script setup lang="ts">
import type { colors } from '@/types';
import { ref } from 'vue';
import { Coil } from '@/classes';
import CoilsList from './coils/CoilsList.vue';
import { useCoils } from '@/hooks/useCoils';
import { usePrinters } from '@/hooks/usePrinters';
import type { RefSymbol } from '@vue/reactivity';

const {coils, create, deleteCoil} = useCoils();
const {printers} = usePrinters();
const dialogVisible = ref(false);
const popupVisible = ref(false);
let lengthError = ref<string | null>(null);

const formData = ref<{name: string, color: colors, length: number}>(
    {
        name: '',
        color: '#DC143C',
        length: 0,
    }
)
function createCoil() {
    if(formData.value.length <= 0) {
        lengthError.value = 'Длина нити должна быть положительной'
        return;
    }
    const newCoil = new Coil(formData.value.name, formData.value.color, Number(formData.value.length));
    create(newCoil);
    dialogVisible.value = false;
}

function handleDeleteBtn (coil: Coil) {
    if(coil.printerId) {
        popupVisible.value = true
        return;
    }
    deleteCoil(coil);
}
function showModal() {
    dialogVisible.value = true;
} 
</script>

<template>
    <CoilsList @delete="handleDeleteBtn" class="figure__list" :coils="coils"/>
    <Popup v-model:show="popupVisible">
        <p>Вам нужно удалить пластик из принтера</p>
    </Popup>
    <UIButton class="addbtn" @click="showModal">Созать пластик</UIButton>
    <UIModal v-model:show="dialogVisible">
        <form @submit.prevent>
            <h4 class="form__text">Создание пластика</h4>
            <p class="label">Имя</p>
            <UIInput
            placeholder="Имя пластика"
            required type="text"
            minlength="3"
            v-model="formData.name"
            /> 
            <p class="label">Цвет</p>
            <select class="color-select" v-model="formData.color" :style="{backgroundColor: formData.color}">
                <option class="option" value="#DC143C" style="background-color: #DC143C;"></option>
                <option class="option" value="#C71585" style="background-color: #C71585;"></option>
                <option class="option" value="#FF4500" style="background-color: #FF4500;"></option>
                <option class="option" value="#FFD700" style="background-color: #FFD700;"></option>
                <option class="option" value="#800080" style="background-color: #800080;"></option>
            </select>
            <p class="label">Длина</p>
            <UIInput
            placeholder="Длина пластика"
            type="number"
            v-model="formData.length"
            />
            <p style="color: red" v-if="lengthError">{{ lengthError }}</p>
            <UIButton @click="createCoil" class="modal__button">Создать</UIButton>
        </form>
        
    </UIModal>
</template>

<style scoped>
    .label {
        margin-top: 10px;
    }
    .color-select {
        height: 40px;
        width: 90%;
        border-radius: 7px;
        margin-top: 10px;
    }
    .modal__button {
        margin-top: 20px;
    }
    .addbtn {
        margin-left:  45%;
        margin-top: 30px;
    }
    .figure__list {
        width: 60%;
        margin: 0 auto;
        margin-top: 20px;
    }
</style>