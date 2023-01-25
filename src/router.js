import { createWebHistory, createRouter } from "vue-router";
import PlannerList from './components/PlannerList';
import KakaoMap from './components/KakaoMap';
import Home from './components/Home';

const routes = [
  {
    path: "/planner",
    component: PlannerList,
  },
  {
    path: "/planner/id",
    component: KakaoMap,
  },
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 