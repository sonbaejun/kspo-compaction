<template>
  <div>
    <button class="editBtn">수정</button>
    <button class="deleteBtn">삭제</button>

    <div class="planInfo">
      <h4>{{ planner.title }}</h4>
      <h4>{{ planner.intro }}</h4>
      <h4>{{ planner.start_date }}</h4>
      <h4>{{ planner.end_date }}</h4>
      <h4>{{ planner.id }}</h4>
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
          <input type="text" v-model="rs.date" placeholder="YYYY-MM-DD HH:MM" readonly/>
        </div>
      </div>
    </div>

<!--     <div class="plan" v-for="rs in planner.planList" :key="rs.name">
      <h4>{{ rs.name }}</h4>
      <h5>{{ rs.memo }}</h5>
      <h5>{{ rs.date }}</h5>
      <h5>{{ rs.x }}</h5>
      <h5>{{ rs.y }}</h5>
    </div> -->
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
        planList: [],
      },
    };
  },
  methods: {
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
    showDate(rs) {
      rs.view = 1;
      this.curDate = rs.date;
    },
    checkDay(rs) {
      if (rs.date == this.curDate) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    /* localhost:8080/api/v1/planner/{id} */
    axios
      .get(
        `https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner`
      )
      .then((response) => {
        console.log(response.data);
        this.planner.id = response.data.id;
        this.planner.title = response.data.title;
        this.planner.intro = response.data.intro;
        this.planner.start_date = response.data.start_date;
        this.planner.end_date = response.data.end_date;
        response.data.planList.forEach((a) => {
          this.planner.planList.push(a);
        });
        this.setDate();
      })
      .catch((err) => {
        console.log(err);
      });
    this.id = this.$route.params.id;
    console.log(this.$route.params.id);
    console.log(this.id);
    console.log(`test 해보${this.id}겠어요`);
    
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