<template>
  <nav>
    <v-toolbar dense style="height: 55px">
      <img
        src="../../assets/image 4.png"
        style="
          margin-left: 10px;
          margin-right: 2px;
          margin-top: 2px;
          border-radius: 10px;
          cursor: pointer;
          height: 45px;
          width: 42px;
        "
        @click="goHome"
      />
      <v-toolbar-title class="headerTitle" style="color: #1bc6ec"
        >ClickTour</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <div style="margin-top: 3px">
        <v-btn
          color="warning"
          fab
          dark
          style="height: 37px; width: 37px; margin-top: 3px"
        ></v-btn>
        <v-btn
          class="loginBtn"
          style="
            height: 37px;
            width: 37px;
            margin-right: 15px;
            border-radius: 8px;
            background-color: #1bc6ec;
            color: aliceblue;
            font-size: 12px;
          "
          >Login</v-btn
        >
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  //https://picsum.photos/id/11/500/300
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>


<style scoped>
</style>