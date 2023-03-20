<template>
  <div style="text-align: center">
    <v-btn
      class="routerBtn"
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
      @click="goComponents('planList')"
    >
      MY PLANNER
    </v-btn>

    <v-btn
      class="routerBtn"
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
      @click="goComponents('recommend')"
    >
      RECOMMEND
    </v-btn>
    <v-btn
      class="routerBtn"
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
      @click="goComponents('visiblePlan')"
    >
      VISIBLE
    </v-btn>
    <v-btn
      class="routerBtn"
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
      @click="goComponents('reviewBoard')"
    >
      REVIEW
    </v-btn>
  </div>
</template>
    
    <script>
import { store } from "../store/store";

export default {
  methods: {
    goComponents(path) {
      this.$router.push({ path: `/${path}` });
    },
  },
};
</script>
    
<style>
</style>