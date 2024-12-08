<script lang="ts">
export default {
    name: 'UIModal',
    methods: {
    hideDialog() {
        this.$emit('update:show', false);
    }
}
}

</script>

<script setup lang="ts">
    const props = withDefaults(defineProps<{ show: boolean }>(), {
    show: false,
});
</script>

<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
            <button class="close" @click="hideDialog"><img src="../../assets/close.svg" class="close-svg" alt=""></button>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .dialog { 
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        position: fixed;
        display: flex;
    }

    .dialog__content {
        margin: auto;
        background: white;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }

    .close {
        position: relative;
        left: 96%;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 1; /* Убедиться, что крестик выше контента окна */
    }

    .close-svg {
        width: 20px; /* Размер иконки */
        height: 20px;
        display: block;
    }
</style>