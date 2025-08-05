<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <h3 class="text-h3 q-mb-md">Naves</h3>
            <p class="text-h5">Conheça as naves lendárias da galáxia muito, muito distante.</p>
          </section>

          <!-- Lista paginada com modal -->
          <NavegationView endpoint="starships" />
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
  background-position: center 30%;
  background-image: url('https://i.pinimg.com/1200x/0e/02/fd/0e02fd9ff3775ea7be75d28795e569d0.jpg');
}
</style>

