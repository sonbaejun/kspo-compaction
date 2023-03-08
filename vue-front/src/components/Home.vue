<template>
  <div style="text-align: center">
    <v-btn
      depressed
      style="
        background-color: #1bc6ec;
        color: white;
        width: 50%;
        border-radius: 40px;
        height: 60px;
        align: center;
        margin-top: 80px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
      "
      @click="goPlannerList"
    >
      PLANNER
    </v-btn>

    <v-btn
      depressed
      style="
        background-color: #1bc6ec;
        color: white;
        width: 50%;
        border-radius: 40px;
        height: 60px;
        align: center;
        margin-top: 30px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
      "
      @click="goRecommend"
    >
      CREW
    </v-btn>
    <v-btn
      depressed
      style="
        background-color: #1bc6ec;
        color: white;
        width: 50%;
        border-radius: 40px;
        height: 60px;
        align: center;
        margin-top: 30px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
      "
      @click="visiblePlan"
    >
      VISIBLE
    </v-btn>
  </div>
</template>
    
    <script>
import { store } from "../store/store";

export default {
  methods: {
    goPlannerList() {
      this.$router.push({ path: "/planList" });
    },
    goRecommend() {
      this.$router.push({ path: "/recommend" });
    },
    visiblePlan() {
      this.$router.push({ path: "/visiblePlan" });
    },
  },
};
</script>
    
    <style>
</style>