<template>
  <q-header class="bg-dark text-white shadow-2">
    <q-toolbar>
      <q-toolbar-title class="text-center">
        <span @click="$router.push('/')"> Star Wars </span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup>
// Nenhuma lógica necessária, só roteamento simples
</script>

<style>

@font-face {
  font-family: 'Star Jedi';
  src: url('../assets/fonts/STJEDISE.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.q-header {
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

span {
  font-family: 'Star Jedi';
  font-size: 3rem;
  cursor: pointer;
  line-height: 2;
  text-shadow:
    2px 2px 0 #000,
    4px 4px 0 #d8d50d;
}
</style>
