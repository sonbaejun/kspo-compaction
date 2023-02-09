<template>
  <nav @scroll="getScroll">
    <v-toolbar dense style="height: 55px; top: 0px">
      <img
        src="../../assets/image 4.png"
        style="
          margin-left: 10px;
          margin-right: 2px;
          margin-top: 5px;
          border-radius: 10px;
          cursor: pointer;
          height: 45px;
          width: 42px;
        "
        @click="goHome"
      />
      <v-toolbar-title
        class="headerTitle"
        style="color: #1bc6ec; margin-top: 3px; cursor: pointer;"
        @click="goHome"
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
  mounted() {
    document.addEventListener("scroll", this.getScroll);
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    getScroll() {
      window.addEventListener("scroll", function () {
        console.log(window.scrollY);
      });
    },
  },
};
</script>


<style scoped>
</style>