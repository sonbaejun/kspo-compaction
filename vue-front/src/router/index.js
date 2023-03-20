import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import KakaoMap from '@/components/KakaoMap'
import PlannerList from '@/components/PlannerList'
import PlanView from '@/components/PlanView'
import EditPlan from '@/components/EditPlan'
import Login from '@/components/Login'
import Recommend from '@/components/Recommend'
import VisiblePlan from '@/components/VisiblePlan'
import ReviewBoard from '@/components/ReviewBoard'
import ReviewBoardView from '@/components/ReviewBoardView'
import ReviewBoardWrite from '@/components/ReviewBoardWrite'

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
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      props: true,
    },
    {
      path: '/visiblePlan',
      name: 'VisiblePlan',
      component: VisiblePlan,
      props: true,
    },
    {
      path: '/reviewBoard',
      name: 'ReviewBoard',
      component: ReviewBoard,
      props: true,
    },
    {
      path: '/reviewBoardView',
      name: 'ReviewBoardView',
      component: ReviewBoardView,
      props: true,
    },
    {
      path: '/reviewBoardWrite',
      name: 'ReviewBoardWrite',
      component: ReviewBoardWrite,
      props: true,
    }
  ]
})
