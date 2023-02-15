import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import KakaoMap from '@/components/KakaoMap'
import PlannerList from '@/components/PlannerList'
import PlanView from '@/components/PlanView'
import EditPlan from '@/components/EditPlan'
import Login from '@/components/Login'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/planWrite',
      name: 'KakaoMap',
      component: KakaoMap
    },
    {
      path: '/planList',
      name: 'PlannerList',
      component: PlannerList,
      props: true,
    },
    {
      path: '/planView/:id',
      name: 'PlanView',
      component: PlanView,
      props: true,
    },
    {
      path: '/planEdit',
      name: 'EditPlan',
      component: EditPlan,
      props: true,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
    }
  ]
})
