<script lang="ts">
export default {
    name: 'UIInput',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event: Event) {
            this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
        }
    }
}
</script>

<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
    border-radius: 8px;
}
</style>