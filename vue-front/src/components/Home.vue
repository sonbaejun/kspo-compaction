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
        margin-top: 30px;
      "
      @click="goPlannerList"
    >
      PLANNER
    </v-btn>
  </div>
</template>
    
    <script>
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