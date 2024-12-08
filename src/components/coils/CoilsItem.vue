<script setup lang="ts">
    import { Coil } from '@/classes';
    const coil = defineProps<{coil: Coil}>();

</script>

<template>
    <li 
    class="item"
    :style="{ borderColor: coil.coil.color }"
    >
        <div class="title__wrapper">
                <p class="text">{{ coil.coil.name }}</p>
                <img src="../../assets/coil.svg"  alt="">
        </div>
        <p class="text-length">Длина: {{ coil.coil.length }}</p>
        <slot></slot>
    </li>
</template>

<style scoped>
.title__wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.item {
    display:flex;
    font-size: 24px;
    padding: 10px;
    border: 3px solid black;
    border-radius: 8px;
    width: 47%;
    flex-direction: column;
}

.text-length {
    text-align: left;
}
</style>