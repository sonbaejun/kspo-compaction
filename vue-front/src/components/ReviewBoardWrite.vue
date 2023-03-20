<template>
  <div>
    <v-text-field
      label="제목"
      outlined
      style="width: 90%; margin-left: 35px"
      shaped
      v-model="board.title"
    ></v-text-field>
    <v-textarea
      outlined
      name="input-7-4"
      style="width: 90%; margin-left: 35px"
      label="내용"
      auto-grow
      rows="4"
      row-height="30"
      shaped
      v-model="board.content"
    ></v-textarea>
    <div style="width: 90%; margin-left: 35px">
      <v-btn color="#1bc6ec" style="color: white" @click="writeBoard"
        >완료</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      board: {
        title: "",
        nickname: "",
        content: "",
      },
    };
  },
  mounted() {
    if (this.$route.params.board != undefined) {
      this.board.title = this.$route.params.board.title;
      this.board.content = this.$route.params.board.content;
    }
  },
  methods: {
    writeBoard() {
      this.board.nickname = this.$store.state.userInfo.nickname;
      //https://reqres.in/api/users
      //http://localhost:8080/api/v1/board/post
      axios({
        method: "post", // [요청 타입]
        url: "https://reqres.in/api/users", // [요청 주소]
        data: JSON.stringify(this.board), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-AUTH-TOKEN": localStorage.getItem("access_token"),
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then((response) => {
          console.log("RESPONSE : " + JSON.stringify(response.data));
          setTimeout(() => {
            this.$router.push({ path: "/reviewBoard" });
          }, 100);
        })
        .catch((error) => {
          //비로그인 시 로그인 창으로 이동
          if (error.stateCode == "403") {
            alert("로그인이 필요한 서비스입니다.");
            this.$router.push({
              name: "Login",
              params: { board: this.board },
            });
            return;
          }
          console.log("ERROR : " + JSON.stringify(error));
        });
    },
  },
};
</script>

<style scoped>
::v-deep .test {
  background-color: #1bc6ec !important;
}
</style>