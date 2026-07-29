import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/cars',
      name: 'Cars',
      component: () => import('../views/Menu/Cars/Cars.vue'),
      meta: {
        title: 'Cars',
      },
    },
    {
      path: '/cars/create',
      name: 'CarsCreate',
      component: () => import('../views/Menu/Cars/Create.vue'),
      meta: {
        title: 'CarsCreate',
      },
    },
    {
      path: '/cars/:id/edit',
      name: 'CarsEdit',
      component: () => import('../views/Menu/Cars/Edit.vue'),
      meta: {
        title: 'CarsEdit',
      },
    },
    {
      path: '/components',
      name: 'Components',
      component: () => import('../views/Menu/Components/Components.vue'),
      meta: {
        title: 'Components',
      },
    },
    {
      path: '/races',
      name: 'Races',
      component: () => import('../views/Menu/Races/Races.vue'),
      meta: {
        title: 'Races',
      },
    },
    {
      path: '/races/create',
      name: 'RacesCreate',
      component: () => import('../views/Menu/Races/Create.vue'),
      meta: {
        title: 'RacesCreate',
      },
    },
    {
      path: '/races/:id/edit',
      name: 'RacesEdit',
      component: () => import('../views/Menu/Races/Edit.vue'),
      meta: {
        title: 'RacesEdit',
      },
    },
    {
      path: '/results',
      name: 'Results',
      component: () => import('../views/Menu/Results/Results.vue'),
      meta: {
        title: 'Results',
      },
    },
    // {
    //   path: '/blank',
    //   name: 'Blank',
    //   component: () => import('../views/Pages/BlankPage.vue'),
    //   meta: {
    //     title: 'Blank',
    //   },
    // },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})
