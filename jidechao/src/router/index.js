import Vue from 'vue'
import Router from 'vue-router'

import index from '../views/index.vue'
import SignIn from '../views/sign-in.vue'
import SignUp from '../views/sign-up.vue'
import Detail from '../views/details.vue'
import Car from '../views/car.vue'
import MySelf from '../views/mySelf.vue'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path:'/index',
    //   redirect:index
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/sign-in',
      name:'sign-in',
      component:SignIn
    },
    {
      path:'/sign-up',
      name:'sign-up',
      component:SignUp
    },
    {
      path:'/details',
      name:'detail',
      component:Detail
    },
    {
      path:'/car',
      name:'car',
      component:Car
    },
    {
      path:'/mySelf',
      name:'mySelf',
      component:MySelf
    }

  ]
})
