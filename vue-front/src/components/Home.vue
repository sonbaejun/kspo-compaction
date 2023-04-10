<template>
  <div>
    <div class="main-background">
      <h4 class="main-title">Plan Yourself!</h4>
      <h6 class="main-subtitle">클릭투어에 오신걸 환영합니다!</h6>
      <h6 class="main-subtitle">환상적인 여행을 위한 여러분의 플랜을</h6>
      <h6 class="main-subtitle">지금 여기, 클릭투어에서 만들어보세요!</h6>
      <button class="main-button" @click="goComponents('planWrite')">
        MAKE PLAN
      </button>
      <button class="main-button" @click="goComponents('planList')">
        MY PLAN
      </button> 
    </div>
    <div style="text-align: center">
      <div class="main-component">
        <v-row no-gutters style="padding-left: 110px; padding-right: 60px">
          <v-col
            cols="12"
            sm="4"
            @click="goComponents('recommend')"
            style="height: 300px; cursor: pointer; border-radius: 50%"
            justify-center
          >
            <v-card
              elevation="24"
              width="400px"
              style="border-radius: 5000px; margin-top: 27px"
            >
              <br />
              <button class="iconBtn1">
                <i class="fas fa-book" style="height: 90px"></i>
              </button>
              <h4 class="cardTitle">Recommend Plan!</h4>
              <h4 class="cardSubtitle">Click!</h4>
              <br />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            @click="goComponents('visiblePlan')"
            style="
              height: 50%;
              cursor: pointer;
              border-radius: 50%;
              text-align: center;
            "
          >
            <v-card
              elevation="24"
              width="400px"
              style="border-radius: 5000px; margin-top: 27px"
            >
              <br />
              <button class="iconBtn2">
                <i class="fas fa-car" style="height: 85px"></i>
              </button>
              <h4 class="cardTitle">Visible Plan!</h4>
              <h4 class="cardSubtitle">Click!</h4>
              <br />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="4"
            @click="goComponents('reviewBoard')"
            style="
              height: 50%;
              cursor: pointer;
              border-radius: 50%;
              text-align: center;
            "
          >
            <v-card
              elevation="24"
              width="400px"
              style="border-radius: 5000px; margin-top: 27px"
            >
              <br />
              <button class="iconBtn3">
                <i class="fas fa-pen" style="height: 85px"></i>
              </button>
              <h4 class="cardTitle">Review Board!</h4>
              <h4 class="cardSubtitle">Click!</h4>
              <br />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
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
    
<style scoped>
.main-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
    url("../assets/mainPage.jpg");
  width: 100%;
  height: 470px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  padding: 1px; /* margin collapse 현상(테두리 겹치면 마진적용X) 해결위한 패딩 */
  padding-left: 50px;
}
.main-title {
  color: white;
  font-size: 40px;
  margin-top: 65px;
  margin-bottom: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.main-subtitle {
  color: white;
  font-size: 15px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.main-button {
  background-color: rgba(211, 211, 211, 0.68);
  color: white;
  font-size: large;
  font-weight: 700;
  width: 120px;
  height: 35px;
  border-radius: 10px;
  margin-top: 27px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.main-component {
  /* background-color: rgb(215, 250, 247); */
  /* padding-top: 10px; */
  border: 1px black;
}

.iconBtn1 {
  color: #49a10296;
}

.iconBtn2 {
  color: #0076d696;
}

.iconBtn3 {
  color: #ff800096;
}

.cardTitle {
  margin-top: 10px;
  font-size: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cardSubtitle {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>