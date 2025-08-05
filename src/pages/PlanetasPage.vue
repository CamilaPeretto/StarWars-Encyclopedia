<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <!-- Navegação das páginas -->
            <NavegationView
              endpoint="planets"
              title="Planetas"
              description="Conheça os planetas incríveis da galáxia muito, muito distante."
            />
          </section>
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

