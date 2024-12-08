<script setup lang="ts">
import { Figure } from '@/classes';
import FigureItem from '../figures/FigureItem.vue';
const figures = defineProps<{ figures: Figure[] }>()
</script>

<template> 
    <div class="content">
        <h2>Models</h2>
        <ul v-if="figures.figures.length > 0" class="list">
            <FigureItem v-for="figure in figures.figures" :figure="figure" :key="figure.id" />
        </ul>
        <h2 v-else>Нет данных о фигурках</h2>
    </div>
</template>


<style scoped>
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
        border: 3px solid #333;
        border-radius: 8px;
        text-align: center;
    }
</style>