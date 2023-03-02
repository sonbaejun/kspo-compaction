<template>
  <v-app ref="app">
    <Header style="margin-bottom: 100px;"></Header>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<script>
import Footer from "./components/layout/Footer.vue";
import Header from "./components/layout/Header.vue";

export default {
  name: "App",
  data() {
    return {
      
    };
  },
  components: {
    Header,
    Footer,
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    console.log(userInfo);
    if (this.userInfo != null) {
      this.$store.commit("setuserInfo", this.userInfo);
    }
  },
};
</script>

<style scoped>
#app {
  position: relative;
}
</style>