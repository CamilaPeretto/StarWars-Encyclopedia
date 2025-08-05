<template>
  <q-layout view="hhh lpr fff">
    <q-page-container>
      <q-page class="q-pa-xl text-white relative-position overflow-hidden">
        
        <!-- HERO SECTION -->
        <section class="hero-section row q-pa-none q-px-md q-pt-xl text-left-md">
          <div class="col-12 col-md-6 text-left-md">
            <h1 class="hero-title text-weight-bold text-yellow-6">
              Venha conhecer o universo de Star Wars
            </h1>
            <p class="hero-text q-mt-md text-grey-3">
              Descubra naves, planetas, personagens e muito mais...
            </p>
          </div>
        </section>

        <!-- Container para seções descritivas -->
        <div class="q-mx-auto q-gutter-xl relative-position page-content">
          
          <!--Sobre o projeto-->
          <section class="glass-card q-pa-xl">
            <h3 class="section-title">Sobre o Projeto</h3>
            <p class="section-text">
              Esta enciclopédia interativa de Star Wars é um tributo à galáxia muito, muito
              distante. Utilizamos a poderosa API SWAPI combinada com a flexibilidade do Quasar
              Framework, Vue 3 e a Composição API para criar uma navegação rápida, responsiva e
              totalmente imersiva.
            </p>
          </section>

          <!--Sobre StarWars-->
          <section class="glass-card q-pa-xl">
            <h3 class="section-title">Sobre Star Wars</h3>
            <p class="section-text">
              Star Wars é mais do que uma franquia, é um fenômeno cultural global. Criada por George
              Lucas, sua história se expande por trilogias, séries derivadas, livros, quadrinhos e
              jogos. A saga explora temas profundos como a jornada do herói, redenção e equilíbrio
              da Força, conquistando milhões de fãs através das gerações.
            </p>
          </section>

          <!-- Onde Assistir -->
          <section class="glass-card q-pa-xl">
            <h3 class="section-title">Onde Assistir</h3>
            <p class="section-text">
              Todos os filmes e séries de Star Wars estão disponíveis no Disney+. A plataforma conta
              com conteúdo clássico, as novas séries do universo expandido e continuações como
              Mandalorian, Obi-Wan Kenobi, Ahsoka e muito mais.
            </p>
          </section>
        </div>

        <!-- Componente de visualização de cards com navegação habilitada -->
        <CardsView :items="cards" :isNavigation="true" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
// Importa o componente de visualização dos cards
import CardsView from '../components/CardsView.vue'

// Lista de cards que será renderizada no CardsView
const cards = [
  {
    id: 1,
    title: 'Personagens',
    description: 'Veja os personagens icônicos',
    image: 'https://i.pinimg.com/736x/3c/13/80/3c1380549189ebe1c1911cc1bcba603c.jpg',
    route: '/personagens',
  },
  {
    id: 2,
    title: 'Naves',
    description: 'Explore as naves lendárias',
    image: 'https://i.pinimg.com/1200x/85/a2/c1/85a2c103e2c0900a4aa6db55de820039.jpg',
    route: '/naves',
  },
  {
    id: 3,
    title: 'Planetas',
    description: 'Descubra planetas incríveis',
    image: 'https://i.pinimg.com/1200x/0d/30/e9/0d30e933b28fb78304a4bec67ff0073d.jpg',
    route: '/planetas',
  },
]
</script>

<style scoped>

.page-content {
  max-width: 1200px;
}
.hero-section {
  background-image: url('https://i.ibb.co/zhTy8ZnJ/freepik-the-style-is-candid-image-photography-with-natural-90070.png');
  background-size: cover;
  background-position: center 1%;
  min-height: 85vh;
  min-width: 100vw;
  padding-top: 300px;
  background-repeat: no-repeat;
}

.hero-title {
  font-size: 2.2rem;
  line-height: 1.3;
}

.hero-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ddd;
}

@media (max-width: 700px) {
  .hero-section {
    min-width: 95vw;
    padding-top: 300px;
    margin-left: -20px;
  }

  .hero-title {
    font-size: 1.2rem;
    text-align: left;
  }

  .hero-text {
    font-size: 1rem;
    text-align: left;
  }
}
</style>
