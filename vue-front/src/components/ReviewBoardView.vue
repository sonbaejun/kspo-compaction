<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            댓글 수정하기
          </v-card-title>

          <v-textarea
            outlined
            name="input-7-4"
            style="width: 90%; margin: 20px 0px 0px 35px"
            label="댓글을 수정하세요"
            auto-grow
            rows="4"
            row-height="30"
            shaped
            v-model="adjustComment.content"
          ></v-textarea>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="editConfirm"> 수정완료 </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-card style="width: 90%; margin-left: 35px" elevation="6">
      <div class="view_header1">
        <div>{{ board.title }}</div>
        <div class="manageBtn" v-if="checkBoardUser == 1">
          <button class="editBtn" @click="goEdit()">수정</button>
          <button class="deleteBtn" @click="deleteBoard()">삭제</button>
        </div>
      </div>
      <div class="view_header2">
        <div id="viewUser"><i class="fas fa-user"></i>{{ board.nickname }}</div>
        <div id="viewDate"><i class="fas fa-clock"></i> {{ viewDate }}</div>
      </div>
      <div id="boardContent">
        <img
          v-for="rs in pictureList"
          :key="rs.pictureURL"
          :src="rs.pictureURL"
          class="boardImg"
        />
      </div>
      <div class="viewContent" v-text="board.content"></div>
    </v-card>
    <div class="balloon">
      <div id="comment_num">{{ board.commentResponseDtoList.length }}</div>
      <div id="comment_title">Comments</div>
    </div>
    <div
      v-for="(item, index) in board.commentResponseDtoList"
      :key="item.comment"
    >
      <v-card style="width: 90%; margin-left: 35px" elevation="4">
        <div class="comment_header">
          <div id="viewUser">
            <i class="fas fa-user"></i>{{ item.nickname }}
            <div class="manageComment" v-if="item.nickname == curNickname">
              <button @click="editComment(index)">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteComment(index)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div id="viewDate">
            <i class="fas fa-clock"></i> {{ item.createdDate }}
          </div>
        </div>
        <div class="commentContent" v-text="item.comment"></div>
      </v-card>
    </div>
    <div>
      <v-textarea
        outlined
        name="input-7-4"
        style="width: 90%; margin: 20px 0px 0px 35px"
        label="댓글을 남겨보세요"
        auto-grow
        rows="4"
        row-height="30"
        shaped
        v-model="comment.comment"
      ></v-textarea>
      <button class="writeComment" @click="writeComment">댓글작성</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      dialog: false,
      boardNickname: "",
      curNickname: "",
      curIndex: 0,
      curId: 0,
      pictureList: [],
      adjustComment: {
        content: "",
      },
      viewDate: "",
      checkBoardUser: 0,
      comment: {
        comment: "",
      },
      board: {
        title: "",
        nickname: "",
        content: "",
        createdDate: "",
        modifiedDate: "",
        commentResponseDtoList: [],
      },
    };
  },
  mounted() {
    this.curNickname = this.$store.state.userInfo.nickname;
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    this.getBoard();
    this.id = this.$route.params.id;
    console.log(this.board);
  },
  methods: {
    writeComment() {
      //https://reqres.in/api/users
      //http://localhost:8080/api/v1/board/comments/post/${this.id}
      axios({
        method: "post", // [요청 타입]
        url: `http://localhost:8080/api/v1/board/comments/post/${this.id}`, // [요청 주소]
        data: JSON.stringify(this.comment), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-AUTH-TOKEN": localStorage.getItem("access_token"),
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then((response) => {
          console.log(response.data);
          this.getBoard();
          setTimeout(() => {
            this.comment.comment = "";
          }, 100);
        })
        .catch((error) => {
          //비로그인 시 로그인 창으로 이동
          if (error.stateCode == "403") {
            alert("로그인이 필요한 서비스입니다.");
            this.$router.push({ name: "Login" });
            return;
          }
          //게시물을 찾을 수 없을 시 게시판 메인화면으로 이동
          else if (error.stateCode == "404") {
            alert("게시물을 찾을 수 없습니다.");
            this.$router.push({ name: "ReviewBoard" });
          }
          console.log("ERROR : " + JSON.stringify(error));
        });
    },
    getBoard() {
      this.pictureList = JSON.parse(localStorage.getItem("pictureList"))
      /* http://localhost:8080/api/v1/board/list/${this.id} */
      /* https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/board/list/id */
      axios
        .get(
          `http://localhost:8080/api/v1/board/list/${this.id}`,
          {
            headers: {
              "X-AUTH-TOKEN": `${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((response) => {
          //서버 사용 시 response.data.nickname
          this.boardNickname = response.data.nickname;
          console.log(this.pictureList);
          if (this.boardNickname == this.$store.state.userInfo.nickname) {
            this.checkBoardUser = 1;
          } else {
            this.checkBoardUser = 0;
          }
          this.board.title = response.data.title;
          this.board.nickname = response.data.nickname;
          this.board.content = response.data.content;
          this.board.createdDate = response.data.createdDate;
          this.board.modifiedDate = response.data.modifiedDate;
          this.board.commentResponseDtoList.length = 0;
          if (response.data.commentResponseDtoList.length > 0) {
            console.log(10);
            response.data.commentResponseDtoList.forEach((a) => {
              this.board.commentResponseDtoList.push(a);
            });
          } else {
            this.board.commentResponseDtoList =
              response.data.commentResponseDtoList;
          }
          this.board.content.replace("\n", "<br />");
          if (this.board.modifiedDate == "") {
            this.viewDate = this.board.createdDate;
          } else {
            this.viewDate = this.board.modifiedDate;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goEdit() {
      this.$router.push({
        name: "ReviewBoardWrite",
        params: { id: this.id, board: this.board },
      });
    },
    deleteBoard() {
      if (confirm("정말 삭제하시겠어요 ?")) {
        axios({
          method: "delete", // [요청 타입]
          url: `http://localhost:8080/api/v1/board/list/delete/${this.id}`, // [요청 주소]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-AUTH-TOKEN": localStorage.getItem("access_token"),
          }, // [요청 헤더]
          timeout: 5000, // [타임 아웃 시간]
        })
          .then(function (response) {
            console.log("RESPONSE : " + JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log("ERROR : " + JSON.stringify(error));
          });
        setTimeout(() => {
          this.$router.push({ path: "/reviewBoard" });
        }, 100);
      }
    },
    editComment(index) {
      this.dialog = true;
      this.curIndex = index;
      this.adjustComment.content =
        this.board.commentResponseDtoList[this.curIndex].comment;
    },
    editConfirm() {
      this.curId = this.board.commentResponseDtoList[this.curIndex].id;
      // http://localhost:8080/api/v1/board/comments/update/${this.curId}
      // https://reqres.in/api/users/2
      axios({
        method: "put", // [요청 타입]
        url: `http://localhost:8080/api/v1/board/comments/update/${this.curId}`, // [요청 주소]
        data: JSON.stringify(this.adjustComment), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-AUTH-TOKEN": localStorage.getItem("access_token"),
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then((response) => {
          console.log(response.data);
          this.getBoard();
          this.dialog = false;
        })
        .catch(function (error) {
          console.log("ERROR : " + JSON.stringify(error));
        });
    },
    deleteComment(index) {
      this.curIndex = index;
      this.curId = this.board.commentResponseDtoList[this.curIndex].id;
      if (confirm("정말 삭제하시겠어요 ?")) {
        axios({
          method: "delete", // [요청 타입]
          url: `http://localhost:8080/api/v1/board/comments/delete/${this.curId}`, // [요청 주소]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-AUTH-TOKEN": localStorage.getItem("access_token"),
          }, // [요청 헤더]
          timeout: 5000, // [타임 아웃 시간]
        })
          .then((response) => {
            console.log("RESPONSE : " + JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log("ERROR : " + JSON.stringify(error));
          });
        setTimeout(() => {
          this.getBoard();
        }, 100);
      }
    },
  },
};
</script>

<style>
.balloon {
  position: relative;
  width: 120px;
  height: 90px;
  background: #1b5691;
  border-radius: 10px;
  margin: 20px 0px 50px 35px;
  text-align: center;
  color: white;
  line-height: 210%;
}
#comment_num {
  font-size: 35px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
  padding: 12px 0 6px;
}
#comment_title {
  font-size: 13px;
  padding: 2px 0 12px 0;
  line-height: 100%;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}
.balloon::after {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #1b5691;
  content: "";
  position: absolute;
  right: 40px;
  top: 90px;
}
.view_header1 {
  background-color: #f8f8f8;
  padding: 15px 30px;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.comment_header {
  background-color: #f8f8f8;
  padding: 15px 30px;
  font-weight: 700;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.manageBtn {
  margin-left: auto;
  padding-right: 15px;
}
.manageComment {
  margin-left: 5px;
}
.editBtn {
  color: white;
  background-color: rgb(0, 195, 255);
  padding: 0 11px 2px;
  line-height: 220%;
  border-radius: 4px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}
.deleteBtn {
  color: white;
  background-color: rgb(255, 75, 0);
  border-color: red;
  padding: 0 11px 2px;
  line-height: 220%;
  border-radius: 4px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}
.view_header2 {
  border: solid #f8f8f8 3px;
  padding: 15px 30px;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.viewContent {
  white-space: pre-line;
  padding: 10px 50px;
}
.commentContent {
  white-space: pre-line;
  padding: 15px 30px;
  margin-bottom: 10px;
}
.writeComment {
  color: white;
  background-color: #1bc6ec;
  border-color: #1bc6ec;
  padding: 0 11px 2px;
  line-height: 220%;
  border-radius: 4px;
  margin-left: 35px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
}
#viewDate {
  margin-left: auto;
  float: right;
  padding-right: 15px;
  color: #bbb;
}
#viewUser svg {
  padding-right: 5px;
}
#viewUser {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
</style>
