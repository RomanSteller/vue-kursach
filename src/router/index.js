import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from '../components/register-component'
import AuthorizeComponent from '../components/authorize-component'
import TableComponent from '../components/table-component'
import MyRoomsComponent from '../components/myrooms-component'


const routes = [
  {
    path: '/my-rooms/:id',
    name: 'rooms',
    component: MyRoomsComponent
  },
  {
    path:'/auth',
    name: 'auth',
    component: AuthorizeComponent
  },
  {
    path:'/registration',
    name: 'registration',
    component: RegisterComponent
  },
  {
    path: '/',
    name: 'Home',
    component: TableComponent
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
