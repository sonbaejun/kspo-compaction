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
    <div id="boardContent">
      <img
        v-for="rs in board.uploadFile"
        :key="rs"
        :src="rs.pictureURL"
        class="boardImg"
      />
    </div>
    <div style="width: 90%; margin-left: 35px; padding: 10px">
      <input
        @change="upload($event.target)"
        multiple
        accept="image/*"
        type="file"
      />
      <v-btn
        color="#1bc6ec"
        style="color: white; float: right"
        @click="writeBoard"
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
      id: "",
      imgURL: "",
      sendingImg: [],
      board: {
        title: "",
        content: "",
        uploadFile: [],
      },
    };
  },
  mounted() {
    if (this.$route.params.board != undefined) {
      this.board.title = this.$route.params.board.title;
      this.board.content = this.$route.params.board.content;
      this.id = this.$route.params.id;
    }
  },
  methods: {
    writeBoard() {
      if (this.id == "") {
        this.board.nickname = this.$store.state.userInfo.nickname;
        //https://reqres.in/api/users
        //http://localhost:8080/api/v1/board/post
        axios({
          method: "post", // [요청 타입]
          url: "http://localhost:8080/api/v1/board/post", // [요청 주소]
          data: JSON.stringify(this.board), // [요청 데이터]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-AUTH-TOKEN": localStorage.getItem("access_token"),
          }, // [요청 헤더]
          timeout: 5000, // [타임 아웃 시간]

          //responseType: "json" // [응답 데이터 : stream , json]
        })
          .then((response) => {
            console.log(response.data);
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
      } else {
        // http://localhost:8080/api/v1/board/list/update/${this.id}
        // https://reqres.in/api/users/2
        axios({
          method: "put", // [요청 타입]
          url: `http://localhost:8080/api/v1/board/list/update/${this.id}`, // [요청 주소]
          data: JSON.stringify(this.board), // [요청 데이터]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-AUTH-TOKEN": localStorage.getItem("access_token"),
          }, // [요청 헤더]
          timeout: 5000, // [타임 아웃 시간]

          //responseType: "json" // [응답 데이터 : stream , json]
        })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log("ERROR : " + JSON.stringify(error));
          });
        setTimeout(() => {
          this.$router.push({ path: "/reviewBoard" });
        }, 100);
      }
    },
    upload(value) {
      let uploader = value.files;
      this.sendingImg.push(uploader[0]);
      let url = URL.createObjectURL(uploader[0]);
      let obj = {
        pictureURL: url,
      };
      this.board.uploadFile.push(obj);
      console.log(this.board.uploadFile);
      console.log(url);
    },
  },
};
</script>

<style scoped>
::v-deep .test {
  background-color: #1bc6ec !important;
}

.boardImg {
  height: 300px;
  width: 450px;
  object-fit: cover;
}
#boardContent {
  padding: 15px 50px;
  border-radius: 10px;
  border-color: rgba(0, 0, 0, 0.42);
}

#boardContent [contenteditable="true"]:empty:before {
  content: attr(placeholder);
  pointer-events: none;
  display: block; /* For Firefox */
}
</style>
