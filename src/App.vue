<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
      <nav class="nav">
        <RouterLink class="link" to="/">Home</RouterLink>
        <RouterLink class="link" to="/printers">Printers</RouterLink>
        <RouterLink class="link" to="/coils">Plastics</RouterLink>
        <RouterLink class="link" to="/figures">Models</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    } 

    .header {
      background-color: gray;
      font-size: 24px;
    }

    .nav {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      width: 400px;
      margin-left: 30px;
    }

    .link {
      text-decoration:none;
      color: black;
    }

    .link:hover {
      color: white;
    }

    li {
      list-style-type: none;
    }

    button {
      background:none;
      border: none;
      cursor: pointer;

    }
</style>
