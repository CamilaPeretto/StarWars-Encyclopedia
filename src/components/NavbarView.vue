<template>
  <q-header class="bg-dark">
    <q-toolbar>
      <q-toolbar-title class="text-center">
        <router-link to="/" class="header-title">Star Wars</router-link>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
@font-face {
  font-family: 'Star Jedi';
  src: url('../assets/fonts/STJEDISE.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.q-header {
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

.header-title {
  font-family: 'Star Jedi', sans-serif;
  font-size: 3rem;
  cursor: pointer;
  line-height: 2;
  text-shadow: 2px 2px 0 #000, 4px 4px 0 #d8d50d;
  color: inherit;
  text-decoration: none;
  display: inline-block;
}
</style>
