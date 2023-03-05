import firebase from 'firebase';
import Vue from 'vue';
import VueRouter from 'vue-router'
import Main from '@/views/main'
import MoviePage from '@/views/moviePage';
import SeriesPage from '@/views/seriesPage'
import AnimePage from '@/views/animePage'
import DashboardPage from '@/views/dashboard'
import LoginPage from '@/views/loginPage'
import Changelog from '@/views/changeLog'
import FavoritePage from '@/views/favorite'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/movie',
        name: 'Movie',
        component: MoviePage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/series',
        name: 'Series',
        component: SeriesPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/anime',
        name: 'Anime',
        component: AnimePage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/favorite/:tab',
        name: 'Favorite',
        component: FavoritePage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/changelog',
        name: 'Changelog',
        component: Changelog,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('movie');
  else next();
});

export default router;