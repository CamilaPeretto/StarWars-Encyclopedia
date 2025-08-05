<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">

          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <!-- Título da página -->
            <h3 class="text-h3 q-mb-md">Planetas</h3>
            <!-- Descrição da página -->
            <p class="text-h5">Descubra os planetas incríveis da galáxia muito, muito distante.</p>
          </section>

          <!-- Grid para exibir os cards dos planetas -->
          <div class="page-grid">
            <!-- Loop para criar um card para cada planeta -->
            <div
              v-for="planet in planets"
              :key="planet.uid"
              class="page-card glass-card"
              @click="openModal(planet.url)"
            >
            <!-- itera sobre o array planets -->
            <!-- chave única para cada elemento -->
            <!-- estilos do card -->
            <!-- abre o modal com os detalhes do planeta -->

            <!-- Nome do planeta -->
            <h3 class="page-nome">{{ planet.name }}</h3>
            </div>
          </div>

          <!-- Mensagem de erro condicional, só aparece se error for true -->
          <div v-if="error" class="error-message">Erro ao carregar planetas. Tente novamente.</div>

          <!-- Área da paginação -->
          <div class="paginacao flex flex-center q-my-xl">
            
            <button
              @click="prevPage"
              :disabled="page === 1"
              class="btn-paginacao"
              aria-label="Página anterior"
            >
            <!-- chama função para voltar página -->
            <!-- desabilita se estiver na primeira página -->
              &lt; <!-- símbolo de "<" -->
            </button>

            <!-- Exibe a página atual -->
            <span class="pagina-atual">{{ page }}</span>

            <!-- Botão para próxima página -->
            <button
              @click="nextPage"
              :disabled="page === totalPages"
              class="btn-paginacao"
              aria-label="Próxima página"
            >
            <!-- chama função para avançar página -->
            <!-- desabilita se estiver na última página -->
              &gt; <!-- símbolo de ">" -->
            </button>
          </div>
        </div>

        <!-- Componente modal que exibe detalhes do planeta selecionado -->
        <ModalView v-model="showModal" :item-url="selectedUrl" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue' // Importa APIs reativas e ciclo de vida do Vue
import ModalView from '../components/ModalView.vue' // Importa componente modal para detalhes

// Estado reativo da página atual (começa na 1)
const page = ref(1)
// Array de planetas carregados da API
const planets = ref([])
// Total de páginas retornadas pela API (padrão 1)
const totalPages = ref(1)
// Estado de erro na requisição
const error = ref(false)

// Estado para controle da exibição do modal (true = modal aberto)
const showModal = ref(false)
// URL do planeta selecionado para carregar no modal
const selectedUrl = ref('')

// Função para buscar planetas na API SWAPI com paginação
const fetchPlanets = async () => {
  error.value = false // reseta o erro a cada nova requisição
  try {
    // Faz a requisição à API, buscando 9 planetas por página
    const response = await fetch(`https://swapi.tech/api/planets?page=${page.value}&limit=9`)
    const data = await response.json()
    planets.value = data.results || [] // atualiza lista de planetas
    totalPages.value = data.total_pages || 1 // atualiza total de páginas da API
  } catch (erro) {
    error.value = true // ativa mensagem de erro em caso de falha
    console.error('Erro ao carregar planetas:', erro) // log para debug
  }
}

// Função que abre o modal passando a URL do planeta
function openModal(url) {
  selectedUrl.value = url
  showModal.value = true
}

// Função para ir para a página anterior (se possível)
function prevPage() {
  if (page.value > 1) {
    page.value-- // decrementa página
    window.scrollTo({ top: 0, behavior: 'smooth' }) // rola para topo suavemente
  }
}

// Função para ir para a próxima página (se possível)
function nextPage() {
  if (page.value < totalPages.value) {
    page.value++ 
    window.scrollTo({ top: 0, behavior: 'smooth' }) // rola para topo suavemente
  }
}

// Quando a página mudar, chama fetchPeople para carregar novos planetas
watch(page, fetchPlanets)
// Busca inicial dos planetas quando componente montar
onMounted(fetchPlanets)
</script>

<style scoped>
/* Título e descrição com background */
.section-card {
  background-position: center center;
  background-image: url('https://i.pinimg.com/1200x/f6/00/ce/f600cef8a02b9dbe6afe15e61cdc9498.jpg');
}
</style>
