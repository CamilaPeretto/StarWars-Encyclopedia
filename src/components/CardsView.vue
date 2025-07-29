<template>
  <div class="row q-col-gutter-md q-mx-auto justify-center" style="max-width: 1230px">
    <div v-for="item in items" :key="item.id" class="col-12 col-md-4">
      <div class="glass-card q-pa-lg cursor-pointer" @click="handleClick(item)">
        <img :src="item.image" alt="Imagem" class="card-img q-mb-md" />
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  items: Array,
  isNavigation: Boolean, // Home navega, SWAPI só exibe
})

const router = useRouter()

function handleClick(item) {
  if (props.isNavigation && item.route) {
    router.push(item.route)
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.glass-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px rgba(255, 255, 255, 0.15);
}

.card-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
}

.card-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 12px;
  text-shadow: 0 0 10px #d8d50d;
}

.card-description {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #ddd;
}
</style>
