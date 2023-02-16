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
        <v-text-field v-model="User.loginId" label="아이디"></v-text-field>
        <v-text-field
          v-model="User.loginPassword"
          label="비밀번호"
          type="password"
        ></v-text-field>
        <v-btn
          type="submit"
          block
          class="mt-2"
          style="
            background-color: #1bc6ec;
            color: white;
            border-radius: 10px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
          "
          @click="Login"
          >로그인</v-btn
        >
      </v-form>
      <div style="clear: both">
        <h4 class="other" @click="dialog = true">회원가입</h4>
        <h4 class="other">ID/PW 찾기</h4>
      </div>
    </v-sheet>
    <div class="text-center">
      <v-dialog v-model="dialog">
        <v-card>
          <img
            src="../assets/image 4.png"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              height: 70px;
              width: 64px;
              align-items: center;
            "
          />
          <v-text-field
            label="아이디"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.loginId"
            required
          ></v-text-field>
          <v-text-field
            label="비밀번호"
            type="password"
            v-model="userRegister.loginPassword"
            style="margin: 0px 15px 0px 15px"
            required
          ></v-text-field>
          <v-text-field
            label="이메일"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.email"
            required
          ></v-text-field>
          <v-text-field
            label="이름"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.name"
            required
          ></v-text-field>
          <v-text-field
            label="닉네임"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.nickname"
            required
          ></v-text-field>
          <v-text-field
            label="나이"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.age"
            required
          ></v-text-field>
          <v-select
            :items="['Man', 'Woman']"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.gender"
            label="Gender"
            required
          ></v-select>
          <v-text-field
            label="거주지역"
            v-model="userRegister.address"
            style="margin: 0px 15px 0px 15px"
            required
          ></v-text-field>
          <v-text-field
            label="소개글"
            style="margin: 0px 15px 0px 15px"
            v-model="userRegister.intro"
            required
          ></v-text-field>
          <v-card-actions>
            <v-btn
              block
              @click="userRegist"
              style="
                background-color: #1bc6ec;
                color: white;
                border-radius: 10px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
              "
              >Next</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      User: {
        loginId: "",
        loginPassword: "",
      },
      userRegister: {
        loginId: "",
        loginPassword: "",
        email: "",
        name: "",
        nickname: "",
        age: "",
        gender: "",
        address: "",
        intro: "",
        picture: "",
      },
      dialog: false,
    };
  },
  methods: {
    Login() {
      console.log(this.User);
      axios({
        method: "post", // [요청 타입]
        url: "/api/login", // [요청 주소]
        data: JSON.stringify(this.User), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
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
    userRegist() {
      console.log(this.userRegister);
      axios({
        method: "post", // [요청 타입]
        url: "https://reqres.in/api/users", // [요청 주소]
        data: JSON.stringify(this.userRegister), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
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
      this.dialog = false;
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
  font-weight: 650;
  font-size: 10;
  line-height: 31px;
  display: flex;
  align-items: center;
  float: left;
  margin: 15px 0px 0px 50px;
  cursor: pointer;

  color: #b3b3b3;
}

.text-center .v-dialog .v-card .v-text-field {
  margin: 0px 15px 0px 15px;
}
</style>