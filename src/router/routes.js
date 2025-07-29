const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('../pages/HomePage.vue') },
      { path: 'personagens', name: 'personagens', component: () => import('../pages/PersonagensPage.vue') },
      { path: 'naves', name: 'naves', component: () => import('../pages/NavesPage.vue') },
      { path: 'planetas', name: 'planetas', component: () => import('../pages/PlanetasPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
]

export default routes

