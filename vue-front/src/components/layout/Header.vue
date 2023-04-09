<template>
  <nav style="margin-bottom: 0px">
    <v-toolbar
      dense
      style="
        height: 55px;
        top: 0px;
        margin-bottom: 35px;
        position: fixed;
        width: 100%;
        z-index: 1000000;
      "
    >
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
        style="
          color: #1bc6ec;
          margin-top: 3px;
          margin-left: 6px;
          cursor: pointer;
          font-family: 'sans-serif';
          font-style: normal;
          font-weight: 700;
          letter-spacing: 8px;
        "
        @click="goHome"
        >ClickTour</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 5px;
        "
        v-if="$store.state.token != null"
      >
        <img
          style="cursor: pointer; border-radius: 50px; margin-top: 14px"
          :src="$store.state.userInfo.picture"
          height="50px"
          width="50px"
        />
        <h4
          style="
            color: #1bc6ec;
            margin-top: 30px;
            margin-right: 15px;
            margin-left: 3px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
          "
        >
          {{ $store.state.userInfo.nickname }}
        </h4>
        <v-btn
          class="loginBtn"
          style="
            height: 37px;
            width: 37px;
            margin-top: 23px;
            border-radius: 8px;
            background-color: #1bc6ec;
            color: aliceblue;
            font-size: 12px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
          "
          @click="goLogin"
          >Logout</v-btn
        >
      </div>
      <div
        style="
          margin-top: 3px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        "
        v-else
      >
        <v-btn
          class="loginBtn"
          style="
            height: 37px;
            width: 37px;
            margin: 2px 15px 0px 2px;
            border-radius: 8px;
            background-color: #1bc6ec;
            color: aliceblue;
            font-size: 12px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
          "
          @click="goLogin"
          >Login</v-btn
        >
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      loginBtn: "Login",
    };
  },
  methods: {
    goHome() {
      this.$router.push("/").catch(() => {});
    },
    goLogin() {
      if (this.$store.state.token != null) {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("access_token");
        this.$store.commit("inituserInfo");
        this.$store.commit("initToken");
        this.$router.push("/").catch(() => {});
      } else {
        this.$router.push("/login").catch(() => {});
      }
    },
  },
};
</script>


<style scoped>
</style>