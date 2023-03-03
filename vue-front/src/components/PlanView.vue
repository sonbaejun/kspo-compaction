<template>
  <div>
    <div style="margin-left: 30px">
      <v-btn
        class="editBtn"
        @click="goEdit"
        style="background-color: #1bc6ec; color: aliceblue; border-radius: 6px"
        >수정</v-btn
      >
      <v-btn
        class="deleteBtn"
        @click="deletePlan"
        style="background-color: red; color: aliceblue; border-radius: 6px"
        >삭제</v-btn
      >
    </div>
    <div>
      <v-card
        elevation="8"
        style="width: 40%; margin-left: 30px; margin-top: 20px; border-radius: 10px; background-color: #36CFFF; color: white; border: 2px solid #1bc6ec;"
      >
        <v-card-title>{{ planner.title }}</v-card-title>
        <v-card-subtitle style="color: white;">{{ planner.intro }}</v-card-subtitle>
        <v-card-text style="color: white; padding: 0px; margin-left: 16px;">{{ planner.start_date + " to " + planner.end_date }}</v-card-text>
        <v-card-text style="color: white; padding: 0px; margin: 2px 0px 0px 16px;">{{ planner.concept + " 여행" }}</v-card-text>
        <v-card-text style="color: white; padding: 0px; margin: 2px 0px 0px 16px;">{{ place }}</v-card-text>
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
    >
      <v-card
        class="mx-auto"
        style="height: 500px; width: 25.9%; margin-left: 0; margin-right: 0; overflow-y: auto;"
        tile
      >
        <v-list dense style="padding: 0;">
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
        style="height: 500px; width: 73.9%; overflow-y: auto"
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
      dateResult: [],
      selectedItem: 0,
      place: "",
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
    };
  },
  methods: {
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
  },
  mounted() {
    /* http://localhost:8080/api/v1/planner/${this.id} */
    /* https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner */
    this.id = this.$route.params.id;
    axios
      .get(
        `http://localhost:8080/api/v1/planner/${this.id}`,
        {
          headers: {
            "X-AUTH-TOKEN": `${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
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
      .catch((err) => {
        console.log(err);
      });
    this.id = this.$route.params.id;
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
