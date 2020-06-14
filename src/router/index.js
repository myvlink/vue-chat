import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import store from '@/store'
import PageNotFound from '@/components/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: PageNotFound
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    props: (route) => ({ type: route.query.type }),
    beforeEnter (to, from, next) {
      if (store.getters.currentUser.username) {
        router.push('/chat')
      } else {
        next()
      }
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
    beforeEnter (to, from, next) {
      if (store.getters.currentUser.username) {
        next()
      } else {
        router.push('/auth?type=signIn')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
