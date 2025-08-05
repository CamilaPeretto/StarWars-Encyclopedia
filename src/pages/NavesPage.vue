<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">

          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <!-- Título da página -->
            <h3 class="text-h3 q-mb-md">Naves</h3>
            <!-- Descrição da página -->
            <p class="text-h5">Conheça as naves lendárias da galáxia muito, muito distante.</p>
          </section>

          <!-- Grid para exibir os cards das naves -->
          <div class="page-grid">
            <!-- Loop para criar um card para cada nave -->
            <div
              v-for="ship in ships"
              :key="ship.uid"
              class="page-card glass-card"
              @click="openModal(ship.url)"
            >
            <!-- itera sobre o array ships -->
            <!-- chave única para cada elemento -->
            <!-- estilos do card -->
            <!-- abre o modal com os detalhes da nave -->

            <!-- Nome da nave -->
            <h3 class="page-nome">{{ ship.name }}</h3>
            </div>
          </div>

          <!-- Mensagem de erro condicional, só aparece se error for true -->
          <div v-if="error" class="error-message">Erro ao carregar naves. Tente novamente.</div>

          <!-- Área da paginação -->
          <div class="paginacao flex flex-center q-my-xl">
            <!-- Botão para página anterior -->
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

        <!-- Componente modal que exibe detalhes da nave selecionada -->
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
// Array de naves carregados da API
const ships = ref([])
// Total de páginas retornadas pela API (padrão 1)
const totalPages = ref(1)
// Estado de erro na requisição
const error = ref(false)

// Estado para controle da exibição do modal (true = modal aberto)
const showModal = ref(false)
// URL da nave selecionada para carregar no modal
const selectedUrl = ref('')

// Função para buscar naves na API SWAPI com paginação
const fetchShips = async () => {
  error.value = false // reseta o erro a cada nova requisição
  try {
    // Faz a requisição à API, buscando 9 naves por página
    const response = await fetch(`https://swapi.tech/api/starships?page=${page.value}&limit=9`)
    const data = await response.json()
    ships.value = data.results || [] // atualiza lista de naves
    totalPages.value = data.total_pages || 1 // atualiza total de páginas da API
  } catch (erro) {
    error.value = true // ativa mensagem de erro em caso de falha
    console.error('Erro ao carregar naves:', erro) // log para debug
  }
}

// Função que abre o modal passando a URL da nave
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
    page.value++ // incrementa página // incrementa página
    window.scrollTo({ top: 0, behavior: 'smooth' }) // rola para topo suavemente
  }
}

// Quando a página mudar, chama fetchPeople para carregar novas naves
watch(page, fetchShips)
// Busca inicial das naves quando componente montar
onMounted(fetchShips)
</script>

<style scoped>
/* Título e descrição com background */
.section-card {
  background-position: center 30%;
  background-image: url('https://i.pinimg.com/1200x/0e/02/fd/0e02fd9ff3775ea7be75d28795e569d0.jpg');
}
</style>
