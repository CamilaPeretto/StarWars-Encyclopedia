<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl bg-dark text-white relative-position overflow-hidden franklin">
        <div class="q-mx-auto relative-position" style="max-width: 1000px; z-index: 1">
          
          <!-- Título -->
          <section
            class="glass-card q-pa-xl q-mb-xl text-center section-card"
            :style="{ backgroundImage: `url('https://i.pinimg.com/1200x/0e/02/fd/0e02fd9ff3775ea7be75d28795e569d0.jpg')` }"
          >
            <h3 class="text-h3 q-mb-md">Naves</h3>
            <p class="text-h5">Conheça as naves lendárias da galáxia muito, muito distante.</p>
          </section>

          <!-- Grid 3x3 de cards -->
          <div class="naves-grid">
            <div
              v-for="ship in ships"
              :key="ship.uid"
              class="nave-card glass-card"
              @click="openModal(ship.url)" 
            >
              <h3 class="nave-nome">{{ ship.name }}</h3>
            </div>
          </div>

          <!-- Paginação -->
          <div class="paginacao flex flex-center q-my-xl franklin">
            <button @click="prevPage" :disabled="page === 1" class="btn-paginacao">
              &lt;
            </button>

            <span class="pagina-atual">{{ page }}</span>

            <button @click="nextPage" :disabled="page === totalPages" class="btn-paginacao">
              &gt;
            </button>
          </div>
        </div>

        <!-- Modal de nave -->
        <ModalView v-model="showModal" :item-url="selectedUrl" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ModalView from '../components/ModalView.vue'

const page = ref(1)
const ships = ref([])
const totalPages = ref(1)

const showModal = ref(false)
const selectedUrl = ref('')

const fetchShips = async () => {
  try {
    const response = await fetch(`https://swapi.tech/api/starships?page=${page.value}&limit=9`)
    const data = await response.json()
    ships.value = data.results || []
    totalPages.value = data.total_pages || 1
  } catch (error) {
    console.error('Erro ao carregar naves:', error)
  }
}

function openModal(url) {
  selectedUrl.value = url
  showModal.value = true
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(page, fetchShips)
onMounted(fetchShips)
</script>

<style scoped>
.franklin {
  font-family: 'Franklin Gothic Medium', 'Franklin Gothic', sans-serif !important;
  text-shadow: none !important;
}

/* Título e descrição com background */
.section-card {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 30%;
  min-height: 300px;
  border-radius: 16px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}

.section-card h3,
.section-card p {
  margin: 0 2rem;
}

/* Grid das naves - 3x3 */
.naves-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* responsivo e flexível */
  gap: 24px 32px;
  margin-bottom: 2rem;
}

/* Card individual */
.nave-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
  font-weight: 600;
  font-size: 1.25rem;
  transition: background 0.3s;
  cursor: pointer;
}

/* Nome da nave com espaçamento e centralizado */
.nave-nome {
  margin: 0;
  letter-spacing: 0.05em;
}

.paginacao {
  gap: 2rem;
}

.btn-paginacao {
  background: transparent;
  color: white;
  font-family: 'Franklin Gothic Medium', 'Franklin Gothic', sans-serif;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  text-shadow: none;
}

.btn-paginacao:hover {
  transform: scale(1.2);
}

.btn-paginacao:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagina-atual {
  font-size: 2rem;
  font-family: 'Franklin Gothic Medium', 'Franklin Gothic', sans-serif;
  text-shadow: none;
}

/* Responsividade pra mobile */
@media (max-width: 767px) {
  .naves-grid {
    grid-template-columns: 1fr;
    gap: 16px 0;
  }

  .nave-card {
    font-size: 1.1rem;
    padding: 1rem;
  }
}
</style>
