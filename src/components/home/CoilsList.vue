<script setup lang="ts">
import { Coil } from '@/classes';
import CoilsItem from '../coils/CoilsItem.vue';
const coils = defineProps<{ coils: Coil[] }>()
</script>

<template>
    <div class="content">
        <h2>Plastics</h2>
        <ul v-if="coils.coils.length > 0" class="list">
            <CoilsItem v-for = "coil in coils.coils" :coil="coil" :key="coil.id" />
        </ul>
        <h2 v-else>Нет данных о фигурках</h2>
    </div>
</template>

<style scoped>
    .content{
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
        border-radius: 8px;
        text-align: center;
    }
</style>