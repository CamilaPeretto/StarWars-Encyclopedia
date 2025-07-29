<template>
  <q-dialog v-model="show" persistent>
    <q-card
      class="bg-dark text-white franklin" style="min-width:350px; max-width: 600px; max-height: 90vh; overflow-y: auto; border-radius: 12px;">
      <q-bar class="q-py-sm">
          <q-space />
        <button class="close-button" @click="close" aria-label="Fechar">✕</button>
      </q-bar>

      <q-separator />

      <q-card-section>
        <div class="text-h5 q-mb-md text-center">{{ itemData.name }}</div>

        <q-list dense>
          <q-item v-for="(value, key) in sortedItemData" :key="key">
            <q-item-section class="text-capitalize" style="max-width: 200px;">{{ traduzirCampo(key) }}:</q-item-section>
            <q-item-section side style="white-space: normal; max-width: 500px;">{{ value }}</q-item-section>

          </q-item>
        </q-list>
      </q-card-section>

       <q-separator />

      <q-inner-loading :showing="loading" message="Carregando dados..." />
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  itemUrl: { type: String, required: true }
})
const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)
const itemData = ref({})
const loading = ref(false)

watch(() => props.modelValue, val => {
  show.value = val
  if (val) fetchData()
})

watch(show, val => {
  if (!val) emit('update:modelValue', false)
})

function close() {
  show.value = false
}

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
    pilot: 'Piloto'
  };
  return traducoes[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// ✅ Apenas esses campos serão exibidos no modal
const camposPermitidos = [
  'name', 'title', 'model', 'manufacturer', 'cost_in_credits', 'length',
  'crew', 'passengers', 'max_atmosphering_speed', 'cargo_capacity',
  'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class',
  'height', 'mass', 'hair_color', 'skin_color', 'eye_color',
  'birth_year', 'gender', 'rotation_period', 'orbital_period',
  'diameter', 'climate', 'gravity', 'terrain', 'surface_water',
  'population', 'opening_crawl', 'director', 'producer', 'release_date',
  'people', 'pilot'
]

function isSwapiUrl(str) {
  return typeof str === 'string' && str.startsWith('https://swapi.tech/api/')
}

async function fetchName(url) {
  try {
    const res = await fetch(url)
    const d = await res.json()
    return d.result.properties.name || d.result.properties.title || 'Desconhecido'
  } catch {
    return 'Erro ao carregar'
  }
}

async function processField(field) {
  if (Array.isArray(field)) {
    const results = await Promise.all(field.map(processField))
    return results.join(', ')
  } else if (isSwapiUrl(field)) {
    return await fetchName(field)
  } else {
    return field
  }
}

async function fetchData() {
  loading.value = true
  try {
    const response = await fetch(props.itemUrl)
    const data = await response.json()
    let item = data.result.properties || {}

    // 👇 Só mantém os campos permitidos
    const filtrado = Object.fromEntries(
      Object.entries(item).filter(([key]) => camposPermitidos.includes(key))
    )

    const entries = await Promise.all(
      Object.entries(filtrado).map(async ([key, value]) => {
        const processedValue = await processField(value)
        return [key, processedValue]
      })
    )

    itemData.value = Object.fromEntries(entries)
  } catch (err) {
    console.error('Erro ao buscar detalhes:', err)
  } finally {
    loading.value = false
  }
}

// ✅ Ordena os dados com base na ordem fixa
const sortedItemData = computed(() => {
  const order = [...camposPermitidos] // mesma ordem
  const sorted = {}
  order.forEach(key => {
    if (key in itemData.value) sorted[key] = itemData.value[key]
  })
  return sorted
})
</script>

<style scoped>
.franklin {
  font-family: 'Libre Franklin', sans-serif;
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
}

</style>
