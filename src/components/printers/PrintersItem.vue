<script setup lang="ts">
    import { Printer } from '@/classes';
    const printer = defineProps<{printer: Printer}>();

</script>

<template>
    <li 
    class="item"
    >
        <div class="title__wrapper">
            <p class="text">{{ printer.printer.name }}</p>
            <img src="../../assets/printer.svg"  alt="">
        </div>
        <slot :printer="printer.printer"></slot>
    </li>
</template>

<style scoped>
.title__wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.item {
    font-size: 24px;
    padding: 10px;
    border: 4px solid black;
    border-radius: 8px;
    width: 100%;
}
</style>