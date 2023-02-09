<template>
  <v-app ref="app">
    <Header></Header>
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
/* import KakaoMap from "./components/KakaoMap";
import PlannerList from "./components/PlannerList"; */

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
#app {
  position: relative;
}
</style>