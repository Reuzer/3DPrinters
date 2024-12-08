<script setup lang="ts">
    import { Figure } from '@/classes';
    const figure = defineProps<{figure: Figure}>();

</script>

<template>
    <li 
    class="item"
    :style="{  borderColor: figure.figure.color ? figure.figure.color : 'black' }">
        <div class="title__wrapper">
            <p class="text">{{ figure.figure.name }}</p>
            <p class="text">Периметр: {{ figure.figure.perimeter }}</p>
            <p class="text">Время: {{ figure.figure.time }}</p>
            <img src="../../assets/figure.svg" alt="">
        </div>
        <slot></slot>
    </li>
</template>

<style scoped>
.title__wrapper {
    justify-content: space-between;
    width: 100%;
}
.item {
    font-size: 24px;
    padding: 10px;
    border: 4px solid black;
    border-radius: 8px;
    width: 48%;
    justify-content: space-between;
}
</style>