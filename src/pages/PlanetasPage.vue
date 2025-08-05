<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <h3 class="text-h3 q-mb-md">Planetas</h3>
            <p class="text-h5">Conheça os planetas incríveis da galáxia muito, muito distante.</p>
          </section>

          <!-- Lista paginada com modal -->
          <NavegationView endpoint="planets" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavegationView from '../components/NavegationView.vue'
</script>

<style scoped>
.section-card {
  background-position: center center;
  background-image: url('https://i.pinimg.com/1200x/f6/00/ce/f600cef8a02b9dbe6afe15e61cdc9498.jpg');
}
</style>

