<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <!-- Navegação das páginas -->
            <NavegationView
              endpoint="starships"
              title="Naves"
              description="Conheça as naves lendárias da galáxia muito, muito distante."
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
  background-position: center 30%;
  background-image: url('https://i.pinimg.com/1200x/0e/02/fd/0e02fd9ff3775ea7be75d28795e569d0.jpg');
}
</style>

