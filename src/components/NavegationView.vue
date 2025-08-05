<template>
  <!-- Cabeçalho da seção -->
  <div>
    <h3 class="text-h3 q-mb-md">{{ title }}</h3>
    <p class="text-h5">{{ description }}</p>
  </div>

  <!-- Conteúdo principal da grid + paginação -->
  <div class="page-container">
      
      <!-- Grid para exibir os cards dos itens -->
      <div class="page-grid">
        <!-- Loop para criar um card para cada personagem -->
        <div
          v-for="item in items"
          :key="item.uid"
          class="page-card glass-card"
          @click="openModal(item.url)"
        >
            <!-- itera sobre o array people -->
            <!-- chave única para cada elemento -->
            <!-- estilos do card -->
            <!-- abre o modal com os detalhes do personagem -->

          <!-- Nome do personagem -->
          <h3 class="page-nome">{{ item.name }}</h3>
        </div>
      </div>

      <!-- Mensagem de erro condicional, só aparece se error for true -->
      <div v-if="error" class="error-message">
        Erro ao carregar dados. Tente novamente.
      </div>

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
              &lt;  <!-- símbolo de "<" -->
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

    <!-- Componente modal que exibe detalhes do personagem selecionado -->
    <ModalView v-model="showModal" :item-url="selectedUrl" />
  
</template>

<script setup>
import { ref, watch, onMounted } from 'vue' // Importa APIs reativas e ciclo de vida do Vue
import ModalView from './ModalView.vue' // Importa componente modal para detalhes

const props = defineProps({
  title: String,           // Título da seção (ex: "itens")
  description: String,     // Subtítulo/descritivo
  endpoint: String,        // Endpoint da API (ex: "people", "starships", "planets")
})

// Estado reativo da página atual (começa na 1)
const page = ref(1)
// Array de itens carregados da API
const items = ref([])
// Total de páginas retornadas pela API (padrão 1)
const totalPages = ref(1)
// Estado de erro na requisição
const error = ref(false)

// Estado para controle da exibição do modal (true = modal aberto)
const showModal = ref(false)
// URL do item selecionado para carregar no modal
const selectedUrl = ref('')

// Função para buscar itens na API SWAPI com paginação
const fetchData = async () => {
  error.value = false // reseta o erro a cada nova requisição
  try {
    // Faz a requisição à API, buscando 9 itens por página
    const response = await fetch(`https://swapi.tech/api/${props.endpoint}?page=${page.value}&limit=9`)
    const data = await response.json()
    items.value = data.results || [] // atualiza lista de itens
    totalPages.value = data.total_pages || 1 // atualiza total de páginas da API
  } catch (erro) {
    error.value = true // ativa mensagem de erro em caso de falha
    console.error('Erro ao carregar:', erro) // log para debug
  }
}

// Função que abre o modal passando a URL do item
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
    page.value++ // incrementa página
    window.scrollTo({ top: 0, behavior: 'smooth' }) // rola para topo suavemente
  }
}

// Quando a página mudar, chama fetchData para carregar novos itens
watch(page, fetchData)

// Busca inicial dos itens quando componente montar
onMounted(fetchData)
</script>

