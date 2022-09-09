import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'
import HomeView from '../views/HomeView.vue'
import Profile from '../views/Profile.vue' 
import Contact from '../views/Contact.vue' 
import Create from '../views/Create.vue' 
import Edit from '../views/Edit.vue'

const routes = [
  {
    path: '/', 
    name: 'Home',
    redirect: '/contact',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }, 
  {
    path: '/contact/create',
    name: 'Create',
    component: Create
  }, 
  {
    path: '/contact/edit/:id', 
    name: 'Edit',
    component: Edit
  }, 
  {
    path: '/contact/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/:pathMatch(.*)*', //vue 3 releases router err 
    name: 'PageNotFound',
    component: PageNotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


