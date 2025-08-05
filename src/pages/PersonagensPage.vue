<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden">
        <div class="page-container">
          
          <!-- Seção do título principal -->
          <section class="glass-card q-pa-xl q-mb-xl text-center section-card">
            <!-- Título da página -->
            <h3 class="text-h3 q-mb-md">Personagens</h3>
            <!-- Descrição da página -->
            <p class="text-h5">Conheça os personagens da galáxia muito, muito distante.</p>
          </section>

          <!-- Grid para exibir os cards dos personagens -->
          <div class="page-grid">
            <!-- Loop para criar um card para cada personagem -->
            <div
              v-for="person in people" 
              :key="person.uid"
              class="page-card glass-card"
              @click="openModal(person.url)"
            >
            <!-- itera sobre o array people -->
            <!-- chave única para cada elemento -->
            <!-- estilos do card -->
            <!-- abre o modal com os detalhes do personagem -->

              <!-- Nome do personagem -->
              <h3 class="page-nome">{{ person.name }}</h3>
            </div>
          </div>

          <!-- Mensagem de erro condicional, só aparece se error for true -->
          <div v-if="error" class="error-message">
            Erro ao carregar personagens. Tente novamente.
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue' // Importa APIs reativas e ciclo de vida do Vue
import ModalView from '../components/ModalView.vue' // Importa componente modal para detalhes

// Estado reativo da página atual (começa na 1)
const page = ref(1)
// Array de personagens carregados da API
const people = ref([])
// Total de páginas retornadas pela API (padrão 1)
const totalPages = ref(1)
// Estado de erro na requisição
const error = ref(false)

// Estado para controle da exibição do modal (true = modal aberto)
const showModal = ref(false)
// URL do personagem selecionado para carregar no modal
const selectedUrl = ref('')

// Função para buscar personagens na API SWAPI com paginação
const fetchPeople = async () => {
  error.value = false // reseta o erro a cada nova requisição
  try {
    // Faz a requisição à API, buscando 9 personagens por página
    const response = await fetch(`https://swapi.tech/api/people?page=${page.value}&limit=9`)
    const data = await response.json()
    people.value = data.results || [] // atualiza lista de personagens
    totalPages.value = data.total_pages || 1 // atualiza total de páginas da API
  } catch (erro) {
    error.value = true // ativa mensagem de erro em caso de falha
    console.error('Erro ao carregar personagens:', erro) // log para debug
  }
}

// Função que abre o modal passando a URL do personagem
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

// Quando a página mudar, chama fetchPeople para carregar novos personagens
watch(page, fetchPeople)

// Busca inicial dos personagens quando componente montar
onMounted(fetchPeople)
</script>

<style scoped>
/* Título e descrição com background */
.section-card {
  background-position: center center;
  background-image: url('https://i.pinimg.com/1200x/45/b4/2b/45b42b43e05f302fcfa111cdf1a9907c.jpg');
}

/* Responsividade pra mobile */
@media (max-width: 767px) {
  .glass-card h3 {
    margin-left: -20px;
  }
}
</style>
