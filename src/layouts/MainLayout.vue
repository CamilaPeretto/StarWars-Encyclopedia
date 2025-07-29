<template>
  <q-layout view="hhh lpr fff">
    <Navbar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup>
import Navbar from '../components/NavbarView.vue'
import Footer from '../components/FooterView.vue'
</script>

