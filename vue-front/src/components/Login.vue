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
      </div>
    </v-sheet>
    <div class="text-center">
      <v-dialog width="fit-content" v-model="dialog">
        <v-card style="width: 450px; padding-top: 5px">
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <img
              v-if="modal == 0"
              :src="userRegister.picture"
              @click="modal = 1"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50px;
                height: 50px;
                width: 50px;
                cursor: pointer;
                margin: 5px 0px;
                align-items: center;
              "
            />
            <div v-if="modal == 1">
              <div>
                <img
                  v-for="rs in imageSrc"
                  :key="rs.url"
                  :src="rs.url"
                  @click="setProfile(rs)"
                  style="
                    border-radius: 50px;
                    height: 50px;
                    width: 50px;
                    cursor: pointer;
                    margin: 5px 0px;
                    align-items: center;
                  "
                />
              </div>
            </div>
          </div>
          <v-text-field
            label="아이디(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="userRegister.loginId"
            required
          ></v-text-field>
          <v-text-field
            label="비밀번호(필수)"
            type="password"
            v-model="userRegister.loginPassword"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            required
          ></v-text-field>
          <v-text-field
            label="이메일(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="userRegister.email"
            required
          ></v-text-field>
          <v-text-field
            label="이름(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="userRegister.name"
            required
          ></v-text-field>
          <v-text-field
            label="닉네임(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="userRegister.nickname"
            required
          ></v-text-field>
          <v-text-field
            label="나이(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="userRegister.age"
            required
          ></v-text-field>
          <v-text-field
            label="성별(필수)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
            v-model="genderGet"
            @click="gender()"
            readonly
            required
          ></v-text-field>
          <div
            v-if="genderSelect == 1"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
          >
            <div v-for="(item, index) in radioList" :key="index">
              <input
                type="radio"
                :id="item.key"
                v-model="genderGet"
                :value="item.value"
              />
              <label :for="item.key" class="text">{{ item.value }}</label>
            </div>
          </div>
          <v-text-field
            label="거주지역(선택)"
            v-model="userRegister.address"
            style="margin: 0px 15px 0px 15px; padding-top: 7px"
            required
          ></v-text-field>
          <v-text-field
            label="소개글(선택)"
            style="margin: 0px 15px 0px 15px; padding-top: 1px"
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
      testUser: {
        email: "",
        password: "",
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
        picture:
          "https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png",
      },
      userInfo: {
        nickname: "",
        picture: "",
      },
      imageSrc: [
        {
          url: "https://velog.velcdn.com/images/heelieben/post/675309bf-a0a3-4443-8ced-8a55ce40ce08/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/bbd616dd-bd06-409a-a420-4a4e43e4d925/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/3fc7f9ea-228e-4f3f-8335-903f6cde8ca9/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/aae00279-723b-40e3-bcea-cb547b73b60f/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/a0fd179b-0910-4825-9f1b-423010488429/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/0fd6012b-1c07-4271-9a64-d8f92d65db2c/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/3c15c708-c5b2-404e-858e-138241e90d77/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/d10e12af-0093-43df-9e9c-205f9086b759/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/48b37773-025f-47c0-9e0e-ddb126274128/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/89255d95-95d3-4077-b647-341f5be454e1/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/b5926f2b-d3d7-48c2-8f02-bc1356400d27/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/a6b6fa8a-3477-400f-9123-07b3ff0ced64/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/52ec0df2-5bc4-41fc-9e1b-90bd33e253c3/image.png",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/e2ce21c1-347b-485b-8bff-be03a617565c/image.PNG",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/e11ee4fd-860a-44fa-80df-18f46ed2d35e/image.PNG",
        },
        {
          url: "https://velog.velcdn.com/images/heelieben/post/6a9d7883-1ff5-4b8d-94ac-70f9e8e79415/image.png",
        },
      ],
      radioList: [
        {
          key: "00",
          value: "Man",
        },
        {
          key: "01",
          value: "Woman",
        },
      ],
      modal: 0,
      genderGet: "",
      dialog: false,
      isLogin: false,
      token: "",
      genderSelect: 0,
    };
  },
  watch: {
    genderGet: function (newVal, oldVal) {
      this.userRegister.gender = newVal;
      this.genderSelect = 0;
    },
  },
  methods: {
    //https://reqres.in/api/login
    //http://localhost:8080/api/v1/users/login
    Login() {
      this.testUser.email = this.User.loginId;
      this.testUser.password = this.User.loginPassword;
      axios({
        method: "post", // [요청 타입]
        //서버 사용시 http://localhost:8080/api/v1/users/login
        url: "http://localhost:8080/api/v1/users/login", // [요청 주소]
        //서버 사용시 JSON.stringify(this.User)
        data: JSON.stringify(this.User), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then((response) => {
          console.log("RESPONSE : " + JSON.stringify(response.data));
          //서버 사용 시 token -> jwtToken
          this.$store.dispatch("setToken", response.data.jwtToken);
          localStorage.setItem("access_token", response.data.jwtToken);
          /* token을 이용해 유저정보 get */
          // https://reqres.in/api/users/2
          axios
            // 서버 사용 시 http://localhost:8080/api/v1/users/info
            .get("http://localhost:8080/api/v1/users/info", {
              headers: {
                "X-AUTH-TOKEN": `${localStorage.getItem("access_token")}`,
              },
            })
            .then((response) => {
              // 서버 사용 시 this.userInfo.nickname = response.data.nickname;
              this.userInfo.nickname = response.data.nickname;
              this.userInfo.picture = response.data.picture;
              this.$store.dispatch("setuserInfo", this.userInfo);
              localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
              // 플랜 작성 창에서 넘어왔을 시 로그인 성공 후 플랜 작성 창으로 이동(플래너 데이터와 함께)
              if (this.$route.params.plan != undefined) {
                this.$router.push({
                  name: "KakaoMap",
                  params: { plan: this.$route.params.plan },
                });
              } else if (this.$route.params.board != undefined) {
                this.$router.push({
                  name: "ReviewBoardWrite",
                  params: { board: this.$route.params.board },
                });
              } else {
                this.$router.push("/").catch(() => {});
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.stateCode == 403) {
                alert("회원님의 닉네임이 존재하지 않습니다");
              } else {
                console.log("닉네임 조회 실패");
              }
            });
        })
        .catch((error) => {
          // console.log(error.response.status);
          if (error.stateCode == 403) {
            alert("아이디를 확인해주세요");
          } else if (error.stateCode == 400) {
            alert("비밀번호가 일치하지 않습니다");
          } else {
            alert("로그인에 실패하였습니다");
          }
        });
    },
    //https://reqres.in/api/users
    //서버 사용 시 http://localhost:8080/api/v1/users/register
    userRegist() {
      console.log(this.userRegister);
      axios({
        method: "post", // [요청 타입]
        url: "http://localhost:8080/api/v1/users/register", // [요청 주소]
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
          if ((error.stateCode = 403)) {
            alert("아이디 또는 닉네임이 중복됩니다");
          } else {
            console.log("ERROR : " + JSON.stringify(error));
          }
        });
      this.dialog = false;
    },
    gender() {
      if (this.genderSelect == 1) {
        this.genderSelect = 0;
      } else {
        this.genderSelect = 1;
      }
    },
    setProfile(rs) {
      if (this.modal == 1) {
        this.modal = 0;
      } else {
        this.modal = 1;
      }
      this.userRegister.picture = rs.url;
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
  margin: 15px 0px 0px 117px;
  cursor: pointer;

  color: #b3b3b3;
}

.text-center .v-dialog .v-card .v-text-field {
  margin: 0px 15px 0px 15px;
}
</style>