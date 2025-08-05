<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <h3 class="text-h3 q-mb-md">Personagens</h3>
            <p class="text-h5">Conheça os personagens da galáxia muito, muito distante.</p>
          </section>
          
          <!-- Lista paginada com modal -->
          <NavegationView endpoint="people" />
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
  background-image: url('https://i.pinimg.com/1200x/45/b4/2b/45b42b43e05f302fcfa111cdf1a9907c.jpg');
}

@media (max-width: 767px) {
  .glass-card h3 {
    margin-left: -20px;
  }
}
</style>

