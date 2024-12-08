<script lang="ts">
export default {
    name: 'UIButton'
}
</script>

<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
    background: none;
    border: 1px solid rgb(8, 106, 8);
    padding: 10px;
    color: rgb(8, 106, 8);
    cursor: pointer;
    border-radius: 6px;
}

.btn:hover {
    background-color: green;
    color: white;
}
</style>