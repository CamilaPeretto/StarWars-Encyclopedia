<template>
  <!-- Abre e fecha o modal baseado na variável show -->
  <q-dialog v-model="show">
    <q-card class="bg-dark text-white modal-card">
      <q-bar class="q-py-sm">
        <q-space />
        <!-- Botão de fechar com evento click que chama função close, acessibilidade com aria-label -->
        <button class="close-button" @click="close" aria-label="Fechar">✕</button>
      </q-bar>

      <q-separator />

      <q-card-section>
        <!-- Título exibe o nome do item -->
        <div class="text-h5 q-mb-md text-center">{{ itemData.name }}</div>

        <q-list dense>
          <!-- Loop pelos dados ordenados -->
          <q-item v-for="(value, key) in sortedItemData" :key="key">
            <!-- Nome do campo traduzido e capitalizado -->
            <q-item-section class="text-capitalize">{{ traduzirCampo(key) }}:</q-item-section>
            <!-- Valor do campo -->
            <q-item-section side class="modal-value">{{ value }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <!-- Loading interno, aparece enquanto loading for true -->
      <q-inner-loading :showing="loading" message="Carregando dados..." />
    </q-card>
  </q-dialog>
</template>

<script setup>
// Importa funções reativas e computadas
import { ref, watch, computed } from 'vue'

// Define as props que o componente recebe
const props = defineProps({
  modelValue: { type: Boolean, required: true }, // Controle se o modal está aberto (v-model)
  itemUrl: { type: String, required: true }, // URL da API para buscar os dados do item
})
// Define o evento para comunicar mudanças do v-model para o pai
const emit = defineEmits(['update:modelValue'])

// Estado reativo para controle do modal aberto/fechado
const show = ref(props.modelValue)
// Estado que guarda os dados do item carregado
const itemData = ref({})
// Estado que controla se está carregando dados (loading spinner)
const loading = ref(false)

// Assiste mudanças no modelValue da prop, atualiza show e dispara fetchData se abrir
watch(
  () => props.modelValue,
  (val) => {
    show.value = val
    if (val) fetchData() // Só busca dados se abrir o modal
  },
)

// Assiste mudanças no show local e emite para atualizar o modelValue na origem
watch(show, (val) => {
  if (!val) emit('update:modelValue', false) // Fecha o modal na origem quando show for falso
})

// Função que fecha o modal localmente
function close() {
  show.value = false
}

// Função que traduz nomes de campos da API para nomes amigáveis em português
function traduzirCampo(key) {
  const traducoes = {
    name: 'Nome',
    title: 'Título',
    model: 'Modelo',
    manufacturer: 'Fabricante',
    cost_in_credits: 'Custo (Créditos)',
    length: 'Comprimento',
    crew: 'Tripulação',
    passengers: 'Passageiros',
    max_atmosphering_speed: 'Velocidade Máxima',
    cargo_capacity: 'Capacidade de Carga',
    consumables: 'Consumo',
    hyperdrive_rating: 'Classificação do Hiperdrive',
    MGLT: 'Megalight (MGLT)',
    starship_class: 'Classe da Nave',
    height: 'Altura',
    mass: 'Massa',
    hair_color: 'Cor do Cabelo',
    skin_color: 'Cor da Pele',
    eye_color: 'Cor dos Olhos',
    birth_year: 'Ano de Nascimento',
    gender: 'Gênero',
    rotation_period: 'Período de Rotação',
    orbital_period: 'Período Orbital',
    diameter: 'Diâmetro',
    climate: 'Clima',
    gravity: 'Gravidade',
    terrain: 'Terreno',
    surface_water: 'Água na Superfície (%)',
    population: 'População',
    opening_crawl: 'Texto de Abertura',
    director: 'Diretor',
    producer: 'Produtor',
    release_date: 'Data de Lançamento',
    people: 'Pessoas',
    pilot: 'Piloto',
  }
  // Se não encontrar a tradução, só formata com maiúsculas e troca underline por espaço
  return traducoes[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Lista fixa com os campos permitidos para mostrar no modal (filtra API)
const camposPermitidos = [
  'name',
  'title',
  'model',
  'manufacturer',
  'cost_in_credits',
  'length',
  'crew',
  'passengers',
  'max_atmosphering_speed',
  'cargo_capacity',
  'consumables',
  'hyperdrive_rating',
  'MGLT',
  'starship_class',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'opening_crawl',
  'director',
  'producer',
  'release_date',
  'people',
  'pilot',
]

// Função que verifica se uma string é URL da API SWAPI (para buscar nome)
function isSwapiUrl(str) {
  return typeof str === 'string' && str.startsWith('https://swapi.tech/api/')
}

// Busca o nome ou título do recurso dado a URL da API (quando o campo é um link)
async function fetchName(url) {
  try {
    const res = await fetch(url)
    const d = await res.json()
    // Retorna o nome ou título, ou 'Desconhecido' caso não tenha
    return d.result.properties.name || d.result.properties.title || 'Desconhecido'
  } catch {
    // Em caso de erro, retorna mensagem padrão
    return 'Erro ao carregar'
  }
}

// Função que processa campos complexos, se for array, busca cada item recursivamente, se for URL da API busca o nome
async function processField(field) {
  if (Array.isArray(field)) {
    // Se for array, processa todos os elementos paralelamente e junta com vírgula
    const results = await Promise.all(field.map(processField))
    return results.join(', ')
  } else if (isSwapiUrl(field)) {
    // Se for URL da API, busca o nome usando fetchName
    return await fetchName(field)
  } else {
    // Caso contrário retorna o valor direto
    return field
  }
}

// Função principal que busca os dados do item pela URL da prop
async function fetchData() {
  loading.value = true // Ativa o loading
  try {
    // Busca a URL da API
    const response = await fetch(props.itemUrl)
    const data = await response.json()
    let item = data.result.properties || {}

     // Filtra os dados para manter só os campos permitidos
    const filtrado = Object.fromEntries(
      Object.entries(item).filter(([key]) => camposPermitidos.includes(key)),
    )

     // Processa cada campo para resolver arrays e URLs
    const entries = await Promise.all(
      Object.entries(filtrado).map(async ([key, value]) => {
        const processedValue = await processField(value)
        return [key, processedValue]
      }),
    )
    
    // Atualiza o estado com os dados processados e filtrados
    itemData.value = Object.fromEntries(entries)
  } catch (err) {
    console.error('Erro ao buscar detalhes:', err) // Loga erro no console
  } finally {
    loading.value = false // Desliga o loading independente do resultado
  }
}

// Computed que ordena os campos para garantir que aparecem sempre na mesma ordem no modal
const sortedItemData = computed(() => {
  const order = [...camposPermitidos] // Usa a ordem da lista fixa
  const sorted = {}
  order.forEach((key) => {
    if (key in itemData.value) sorted[key] = itemData.value[key]
  })
  return sorted
})
</script>

<style scoped>
.q-card {
  font-family: 'Libre Franklin', sans-serif;
}

.modal-card {
  min-width: 350px;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
}

.modal-value {
  max-width: 500px;
  white-space: normal;
  word-break: break-word;
}

.close-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0 10px;
  line-height: 1;
  transition: color 0.2s;
}

.close-button:hover {
  color: #d8d50d;
}

.q-dialog__inner {
  align-items: flex-end;
}

.q-card-section {
  overflow-y: auto;
  word-break: break-word;
}

.text-capitalize {
  text-transform: capitalize;
  max-width: 200px;
}
</style>
