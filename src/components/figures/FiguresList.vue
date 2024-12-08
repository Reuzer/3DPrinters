<script setup lang="ts">
import { Figure } from '@/classes';
import FigureItem from './FigureItem.vue';
const figures = defineProps<{ figures: Figure[] }>();
const emit = defineEmits<{
  (e: 'copy', figure: Figure): void,
  (e: 'delete', figure: Figure): void,
}>();

function copyFigure(figure: Figure) {
    const copyFigure = new Figure(figure.name, figure.perimeter, figure.time, null);
    emit('copy', copyFigure);
}

function deleteFigure(figure:Figure) {
    emit('delete', figure);
}
</script>

<template> 
    <div class="content">
        <ul v-if="figures.figures.length > 0" class="list">
            <FigureItem 
            :style="{borderColor: figure.color}" 
            class='item' 
            v-for="figure in figures.figures" 
            :figure="figure" :key="figure.id">

                <div class="btns">
                    <UIButton class="copy__btn" @click="copyFigure(figure)">Копировать</UIButton>
                    <UIButton class="delete__btn" @click="deleteFigure(figure)">Удалить</UIButton>
                </div>
            </FigureItem>
        </ul>
        <h2 v-else>Нет данных о фигурках</h2>
    </div>
</template>


<style scoped>
    .text {
        font-size: 18px;
        margin-top: 10px;
    }
    .btns {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 10px;
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
        align-items: center;
    }

    .list .element {
        flex: 1; 
        min-width: 100px; 
        max-width: calc(50% - 10px); 
        box-sizing: border-box; 
    }

    .item {
        display: block;
    }

    .copy__btn {
        margin-top: 20px;
    }
</style>