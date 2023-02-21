<template>
  <div>
    <button class="editBtn" @click="goEdit">수정</button>
    <button class="deleteBtn" @click="deletePlan">삭제</button>

    <div class="planInfo">
      <h4>{{ planner.title }}</h4>
      <h4>{{ planner.intro }}</h4>
      <h4>{{ planner.start_date }}</h4>
      <h4>{{ planner.end_date }}</h4>
      <h4>{{ planner.id }}</h4>
      <h4>{{ planner.concept }}</h4>
      <h4>{{ planner.placeList[0] }}</h4>
    </div>

    <div class="planner">
      <div class="dateResult" v-for="(rs, i) in dateResult" :key="rs.date">
        <h4 @click="showDate(rs)">Day{{ i + 1 }}</h4>
        <div v-if="rs.view == 1"></div>
      </div>
      <div class="plan" v-for="(rs, idx) in planner.planList" :key="idx">
        <div v-if="checkDay(rs)">
          <h4>{{ rs.name }}</h4>
          <input
            type="text"
            v-model="rs.memo"
            placeholder="메모를 입력하세요."
            readonly
          />
          <input
            type="text"
            v-model="rs.date"
            placeholder="YYYY-MM-DD HH:MM"
            readonly
          />
        </div>
      </div>
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
        this.planner.start_date = response.data.start_date.substring(0,10);
        this.planner.end_date = response.data.end_date.substring(0,10);
        this.planner.concept = response.data.concept;
        response.data.placeList.forEach((a) => {
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
</style>
