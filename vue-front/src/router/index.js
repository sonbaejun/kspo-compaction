import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import KakaoMap from '@/components/KakaoMap'
import PlannerList from '@/components/PlannerList'
import PlanView from '@/components/PlanView'


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
      path: '/planner/id',
      name: 'KakaoMap',
      component: KakaoMap
    },
    {
      path: '/planner',
      name: 'PlannerList',
      component: PlannerList,
      props: true,
    },
    {
      path: '/planner/view',
      name: 'PlanView',
      component: PlanView,
      props: true,
    }
  ]
})
