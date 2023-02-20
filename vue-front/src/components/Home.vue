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
    >
      CREW
    </v-btn>
    <h4>{{ $store.state.userInfo.nickname }}</h4>
  </div>
</template>
    
    <script>
import { store } from '../store/store';

export default {
  methods: {
    goPlannerList() {
      this.$router.push({ path: "/planList" });
    },
  },
};
</script>
    
    <style>
</style>