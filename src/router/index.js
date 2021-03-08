import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '@/components/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn,
    meta: {
      guest: true
    }
  },
  {
    path: '/tenants',
    name: 'Tenants',
    component: () => import('../components/Tenants.vue')
  },
  {
    path: '/tenants/:tenantName/groups',
    name: 'Groups',
    component: () => import('../components/Groups.vue'),
    props: true,
  },
  {
    path: '/tenants/:tenantName/groupTree',
    name: 'GroupTree',
    component: () => import('@/components/GroupTree.vue'),
    props: true,
  },

  {
    path: '/tenants/:tenantName/groups/:groupName/members',
    name: 'Members',
    component: () => import('../components/Members.vue'),
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
