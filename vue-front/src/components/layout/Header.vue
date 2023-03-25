<template>
  <nav>
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
          cursor: pointer;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
        "
        @click="goHome"
        >ClickTour</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <h4
        style="
          color: #1bc6ec;
          margin-top: 3px;
          margin-right: 5px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
        "
      >
        {{ $store.state.userInfo.nickname }}
      </h4>
      <div style="margin-top: 3px" v-if="$store.state.token != null">
        <v-img
          style="cursor: pointer; border-radius: 50px; margin-top: 3px"
          contain
          src="https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png"
          height="50px"
          width="50px"
          cover
        ></v-img>
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
        <v-img
          style="cursor: pointer; border-radius: 50px; margin-top: 3px"
          contain
          src="https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png"
          height="50px"
          width="50px"
          cover
        ></v-img>
        <v-btn
          class="loginBtn"
          style="
            height: 37px;
            width: 37px;
            margin: 7px 15px 0px 2px;
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