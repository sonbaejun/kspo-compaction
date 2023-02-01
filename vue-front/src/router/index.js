import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import KakaoMap from '@/components/KakaoMap'
import PlannerList from '@/components/PlannerList'
import PlanView from '@/components/PlanView'
import EditPlan from '@/components/EditPlan'



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
      path: '/api/v1/planner/post',
      name: 'KakaoMap',
      component: KakaoMap
    },
    {
      path: '/api/v1/planner',
      name: 'PlannerList',
      component: PlannerList,
      props: true,
    },
    {
      path: '/api/v1/planner/:id',
      name: 'PlanView',
      component: PlanView,
      props: true,
    },
    {
      path: '/api/v1/planner/update/:id',
      name: 'EditPlan',
      component: EditPlan,
      props: true,
    }
  ]
})
