<template>
  <div>
    <div>
      <router-link to="/api/v1/planner/post">플랜짜러가기</router-link>
    </div>
    <div>
      <router-link to="/">메인화면으로</router-link>
    </div>
    <div class="plan" v-for="rs in planner.data" :key="rs.name">
      <h4 @click="goPlan(rs)">{{ rs.title }}</h4>
      <h5>{{ rs.intro }}</h5>
      <h5>{{ rs.start_date }}</h5>
      <h5>{{ rs.end_date }}</h5>
      <h5>{{ rs.id }}</h5>
    </div>
  </div>
</template>

  <script>
import axios from "axios";

export default {
  name: "PlannerList",
  data() {
    return {
      planner: {
        data: [],
      },
    };
  },
  methods: {
    clickPlan() {
      console.log(this.modal);
      this.modal = 1;
    },
    goPlan(rs) {
      this.$router.push({ name: "PlanView", params: { id: rs.id } });
    },
  },
  mounted() {
    // https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner
    //http://localhost:8080/api/v1/planner
    axios
      .get("http://localhost:8080/api/v1/planner")
      .then((response) => {
        console.log(response.data.data);
        /* 내가 테스트할땐 data.data로 해야 돌아감 */
        response.data.forEach((a) => {
          this.planner.data.push(a);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

  <style>
.plan {
  top: 0;
  left: 0;
  background-color: #ffffffaa;
  overflow-y: auto;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin: 5px;
  border: 1px black;
}

.plan h4 {
  margin: 0;
  cursor: pointer;
}
.plan h5 {
  margin: 0;
}
</style>
