<template>
  <div>
    <div class="text-center" style="z-index: 1000000; background-color: white">
      <v-row justify="center">
        <v-dialog v-model="showDialog" scrollable width="auto">
          <v-card>
            <v-card-title>여행테마 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <div
                v-for="item in conceptList"
                :key="item.value"
                style="margin: 4px 7px 0px 7px"
              >
                <input
                  type="radio"
                  :id="item.key"
                  v-model="recommendInfo.concept"
                  style="width: auto; margin: 10px 0px"
                  :value="item.value"
                />
                <label
                  :for="item.key"
                  class="text"
                  style="font-size: medium; font-weight: 600"
                  >{{ item.value }}</label
                >
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="showDialog = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="text-center" style="z-index: 1000000; background-color: white">
      <v-row justify="center">
        <v-dialog v-model="showSelected" scrollable width="auto">
          <v-card>
            <v-card-title>여행장소 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px; width: 600px">
              <div
                v-for="(item, index) in placeSelect"
                :key="index"
                style="margin: 4px 7px 0px 7px"
              >
                <input
                  type="checkbox"
                  :id="item"
                  v-model="place"
                  style="width: auto; margin: 10px 0px"
                  :value="item"
                />
                <label
                  :for="item"
                  class="text"
                  style="font-size: medium; font-weight: 600"
                  >{{ item }}</label
                >
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="showSelected = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <v-row
      justify="center"
      class="black-bg"
      v-if="startDatePicker == 1"
      style="z-index: 1000000; height: 100px; background-color: transparent"
    >
      <v-date-picker v-model="recommendInfo.start_date" style="z-index: 1">
        <v-btn
          @click="startDatePicker = 0"
          style="
            background-color: #1bc6ec;
            width: 98%;
            color: white;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            border-radius: 4px;
          "
          >done</v-btn
        >
      </v-date-picker>
    </v-row>
    <v-row
      justify="center"
      class="black-bg"
      v-if="endDatePicker == 1"
      style="z-index: 100000000; height: 100px; background-color: transparent"
    >
      <v-date-picker v-model="recommendInfo.end_date" style="z-index: 1">
        <v-btn
          @click="endDatePicker = 0"
          style="
            background-color: #1bc6ec;
            width: 98%;
            color: white;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            border-radius: 4px;
          "
          >done</v-btn
        >
      </v-date-picker>
    </v-row>
    <div class="black-bg" v-if="modal == 1">
      <div class="white-bg" style="margin: 130px; width: 50%">
        <div>
          <v-text-field
            label="Start"
            v-model="recommendInfo.start_date"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              startDatePicker = 1;
              endDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="End"
            v-model="recommendInfo.end_date"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              endDatePicker = 1;
              startDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="Concept"
            v-model="recommendInfo.concept"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              showDialog = true;
              endDatePicker = 0;
              startDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="Place"
            v-model="place"
            style="margin-top: 0px; padding-top: 0px"
            @click="showSelected = true"
            readonly
          ></v-text-field>
        </div>
        <v-btn
          variant="flat"
          style="
            background-color: #1bc6ec;
            width: 98%;
            color: white;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            border-radius: 4px;
          "
          @click="doneBtn"
        >
          Done
        </v-btn>
      </div>
    </div>
    <div style="margin-left: 30px" v-if="modal == 0">
      <v-btn
        v-if="checkUser == 1"
        class="editBtn"
        @click="goEdit"
        style="background-color: #1bc6ec; color: aliceblue; border-radius: 6px"
        >수정</v-btn
      >
      <v-btn
        v-if="checkUser == 1"
        class="deleteBtn"
        @click="deletePlan"
        style="background-color: red; color: aliceblue; border-radius: 6px"
        >삭제</v-btn
      >
      <v-btn
        v-else-if="checkUser == 0"
        class="editBtn"
        @click="goKakaoMap"
        style="background-color: #1bc6ec; color: aliceblue; border-radius: 6px"
        >복사하기</v-btn
      >
    </div>
    <div v-if="modal == 0">
      <v-card
        elevation="8"
        style="
          width: 40%;
          margin-left: 30px;
          margin-top: 20px;
          border-radius: 10px;
          background-color: #36cfff;
          color: white;
          border: 2px solid #1bc6ec;
        "
      >
        <v-card-title>{{ planner.title }}</v-card-title>
        <v-card-subtitle style="color: white">{{
          planner.intro
        }}</v-card-subtitle>
        <v-card-text style="color: white; padding: 0px; margin-left: 16px">{{
          planner.start_date + " to " + planner.end_date
        }}</v-card-text>
        <v-card-text
          style="color: white; padding: 0px; margin: 2px 0px 0px 16px"
          >{{ planner.concept + " 여행" }}</v-card-text
        >
        <v-card-text
          style="color: white; padding: 0px; margin: 2px 0px 0px 16px"
          >{{ placeString }}</v-card-text
        >
      </v-card>
    </div>
    <div
      style="
        width: 40%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-left: 30px;
        margin-top: 18px;
      "
      v-if="modal == 0"
    >
      <v-card
        class="mx-auto"
        style="
          height: 500px;
          width: 35.9%;
          margin-left: 0;
          margin-right: 0;
          overflow-y: auto;
        "
        tile
      >
        <v-list dense style="padding: 0">
          <v-subheader style="background-color: #1bc6ec; color: aliceblue"
            >DAY</v-subheader
          >
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(rs, i) in dateResult" :key="i">
              <v-list-item-content @click="showDate(rs)">
                <v-list-item-title>Day{{ i + 1 }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-card
        class="mx-auto"
        style="height: 500px; width: 63.9%; overflow-y: auto"
        tile
      >
        <v-list dense style="padding: 0">
          <v-subheader
            style="
              background-color: #1bc6ec;
              color: aliceblue;
              position: sticky;
            "
            >PLAN</v-subheader
          >
          <div v-for="(rs, i) in planner.planList" :key="i">
            <v-list-item v-if="checkDay(rs)">
              <v-list-item-content>
                <v-card elevation="5" outlined style="margin: 2px 0"
                  ><v-list-item-title style="margin: 5px">{{
                    rs.name
                  }}</v-list-item-title>
                  <v-list-item-title style="margin: 5px">{{
                    rs.memo
                  }}</v-list-item-title>
                  <v-list-item-title style="margin: 5px">{{
                    rs.date.substring(11, 16)
                  }}</v-list-item-title>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      modal: 1,
      selectedItem: 0,
      placeString: "",
      nickname: "",
      checkUser: null,
      items: [
        { text: "Real-Time" },
        { text: "Audience" },
        { text: "Conversions" },
      ],
      curDate: "",
      planner: {
        title: "",
        intro: "",
        start_date: "",
        end_date: "",
        concept: "",
        placeList: [],
        planList: [],
      },
      recommendInfo: {
        start_date: "",
        end_date: "",
        concept: "",
        placeList: [],
      },
      startDatePicker: 0,
      endDatePicker: 0,
      showDialog: false,
      showSelected: false,
      dateResult: [],
      place: [],
      conceptList: [
        {
          key: "0",
          value: "식도락",
        },
        {
          key: "1",
          value: "액티비티",
        },
        {
          key: "2",
          value: "관광명소",
        },
        {
          key: "3",
          value: "힐링",
        },
        {
          key: "4",
          value: "호캉스",
        },
        {
          key: "5",
          value: "산악여행",
        },
        {
          key: "6",
          value: "캠핑",
        },
      ],
      placeSelect: [
        "서울",
        "대전",
        "대구",
        "부산",
        "광주",
        "울산",
        "인천",
        "경기",
        "강원도",
        "경남",
        "전라도",
        "제주도",
        "경북",
        "충청도",
      ],
    };
  },
  methods: {
    doneBtn() {
      this.startDatePicker = 0;
      this.endDatePicker = 0;
      let date1 = new Date(this.recommendInfo.start_date);
      let date2 = new Date(this.recommendInfo.end_date);
      let dateDiff = date1 <= date2;
      this.place.forEach((a) => {
        let obj = {
          place: a,
        };
        this.recommendInfo.placeList.push(obj);
      });
      console.log(this.recommendInfo);
      if (
        this.recommendInfo.start_date != "" &&
        this.recommendInfo.end_date != "" &&
        dateDiff
      ) {
        // https://reqres.in/api/users
        // http://localhost:8080/api/v1/planner/recommend
        axios({
          method: "post", // [요청 타입]
          url: "http://localhost:8080/api/v1/planner/recommend", // [요청 주소]
          data: JSON.stringify(this.recommendInfo), // [요청 데이터]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "X-AUTH-TOKEN": localStorage.getItem("access_token"),
          }, // [요청 헤더]
          timeout: 5000, // [타임 아웃 시간]

          //responseType: "json" // [응답 데이터 : stream , json]
        })
          .then((response) => {
            //서버 사용 시 response.data.nickname
            this.nickname = response.data.nickname;
            if (this.nickname == this.$store.state.userInfo.nickname) {
              this.checkUser = 1;
            } else {
              this.checkUser = 0;
            }
            this.planner.title = response.data.title;
            this.planner.intro = response.data.intro;
            this.planner.start_date = response.data.start_date.substring(0, 10);
            this.planner.end_date = response.data.end_date.substring(0, 10);
            this.planner.concept = response.data.concept;
            response.data.placeList.forEach((a) => {
              this.place += `${a.place} `;
              this.planner.placeList.push(a);
            });
            response.data.planList.forEach((a) => {
              this.planner.planList.push(a);
            });
            this.setDate();
            console.log(this.planner.planList);
            console.log(this.planner);
          })
          .catch((error) => {
            console.log("ERROR : " + JSON.stringify(error));
          });
        this.modal = 0;
      } else {
        alert("잘못된 형식입니다(공백 또는 날짜 형식을 확인해주세요)");
      }
    },
    /* 날짜 일수 만큼 Day 생성하는 함수 */
    setDate() {
      let curDate1 = new Date(this.planner.start_date.substring(0, 10));
      while (curDate1 <= new Date(this.planner.end_date.substring(0, 10))) {
        this.dateResult.push({
          date: curDate1.toISOString().split("T")[0] + "T01:00+09:00",
          view: 0,
        });
        curDate1.setDate(curDate1.getDate() + 1);
      }
      this.curDate = this.dateResult[0].date;
    },
    /* 날짜 별 조회 설정 함수 */
    showDate(rs) {
      rs.view = 1;
      this.curDate = rs.date;
    },
    /* 현재 선태한 날짜와 플랜의 날짜가 일치하는지를 반환하는 함수 */
    checkDay(rs) {
      if (rs.date.substring(0, 10) == this.curDate.substring(0, 10)) {
        return true;
      } else {
        return false;
      }
    },
    /* 플랜삭제를 처리하는 함수 */
    /* http://localhost:8080/api/v1/planner/delete/${this.id} */
    deletePlan() {
      if (confirm("정말 삭제하시겠어요 ?")) {
        axios({
          method: "delete", // [요청 타입]
          url: `http://localhost:8080/api/v1/planner/delete/${this.id}`, // [요청 주소]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-AUTH-TOKEN": localStorage.getItem("access_token"),
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
      }
      setTimeout(() => {
        this.$router.push({ path: "/planList" });
      }, 100);
    },
    /* 수정 컴포넌트로 이동하는 함수 */
    goEdit() {
      this.$router.push({
        name: "EditPlan",
        params: { id: this.id, plan: this.planner },
      });
    },
    goKakaoMap() {
      this.$router.push({
        name: "KakaoMap",
        params: { plan: this.planner },
      });
    },
  },
};
</script>

<style>
.plan {
  margin: 5px;
}

.planner {
  margin: 10px;
}

.planner h4 {
  margin: 0;
}

.plan h5 {
  margin: 0;
}

.editBtn {
  cursor: pointer;
  background-color: rgb(148, 148, 254);
}

.deleteBtn {
  cursor: pointer;
  background-color: rgb(221, 146, 146);
}

.dateResult h4 {
  cursor: pointer;
}

.planInfo h4 {
  margin: 0;
}

.planInfo {
  margin: 10px;
}

.mx-auto {
  margin: 0 0;
}
</style>