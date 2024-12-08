<script lang="ts">

export default {
    name: 'Popup',
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    }, methods: {
        hideDialog() {
            this.$emit('update:show', false);
        }
    }
}
</script>

<template>
<div class="popup" v-if="show">
  <div class="popup-content">
    <span @click="hideDialog"><img src="../../assets/close.svg" alt=""></span>
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.popup {
  position: fixed;
  bottom: 20px; /* Расстояние от нижнего края экрана */
  right: 20px; /* Расстояние от правого края экрана */
  background-color: #f44336; /* Красный цвет для ошибки */
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: block; /* По умолчанию отображается */
}

/* Контент внутри попапа */
.popup-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>