<template>
  <div>
    <div class="Icon">
      <img
        src="../assets/image 4.png"
        style="
          margin-left: 10px;
          margin-right: 2px;
          margin-top: 5px;
          border-radius: 10px;
          height: 70px;
          width: 64px;
        "
      />
      <h4
        style="
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 37px;
          line-height: 51px;
          color: #1bc6ec;
        "
      >
        ClickTour
      </h4>
    </div>
    <v-sheet width="300" class="mx-auto" style="margin-top: 30px">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="userId" label="아이디"></v-text-field>
        <v-text-field
          v-model="userPw"
          label="비밀번호"
          type="password"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          class="mt-2"
          style="background-color: #1bc6ec; color: white; border-radius: 10px"
          @click="Login"
          >로그인</v-btn
        >
      </v-form>
      <div style="clear: both">
        <h4 class="other">회원가입</h4>
        <h4 class="other">ID/PW 찾기</h4>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "",
      userPw: "",
    };
  },
  methods: {
    Login() {
      axios({
        method: "post", // [요청 타입]
        url: "https://reqres.in/api/login", // [요청 주소]
        data: JSON.stringify(this.userId, this.userPw), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8", 'Access-Control-Allow-Origin': '*'
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then(function (response) {
          console.log("RESPONSE : " + JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log("ERROR : " + JSON.stringify(error));
        });
    },
  },
};
</script>

<style>
.Icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 130px;
  margin-right: 47px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}

.other {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10;
  line-height: 31px;
  display: flex;
  align-items: center;
  float: left;
  margin: 15px 0px 0px 50px;
  cursor: pointer;

  color: #b3b3b3;
}
</style>