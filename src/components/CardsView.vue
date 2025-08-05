<template>
  <!-- Container principal -->
  <div class="row q-col-gutter-md q-mx-auto justify-center cards-wrapper">
    <!-- Loop pelos itens passados por props; para cada item cria uma coluna -->
    <div v-for="item in items" :key="item.id" class="col-12 col-md-4">
      <!-- Card clicável e chama handleClick ao clicar -->
      <div class="glass-card q-pa-lg cursor-pointer" @click="handleClick(item)">
        <!-- Imagem do item: src e alt dinâmicos conforme o item -->
        <img :src="item.image" :alt="item.title" class="card-img q-mb-md" />
        <!-- Título do item -->
        <h3 class="card-title">{{ item.title }}</h3>
        <!-- Descrição do item -->
        <p class="card-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importa o useRouter do Vue Router para permitir navegação programática
import { useRouter } from 'vue-router'

// Define as props que o componente espera receber
const props = defineProps({
  items: { // Array de itens para renderizar os cards
    type: Array,
    default: () => [],
  },
  isNavigation: { // Flag para dizer se o clique deve navegar
    type: Boolean,
    default: false,
  },
})

// Pega a instância do router para poder fazer navegação via código
const router = useRouter()

// Função que executa ao clicar no card
function handleClick(item) {
  // Só navega se a flag isNavigation estiver true e o item tiver uma rota válida
  if (props.isNavigation && item.route) {
    router.push(item.route) // Navega para a rota especificada no item
  }
}
</script>

<style scoped>
.cards-wrapper {
  max-width: 1230px;
  font-family: 'Libre Franklin', sans-serif;
}
</style>
