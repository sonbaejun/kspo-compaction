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
    // localhost:8080/planner
    axios
      .get("https://f86a523c-df58-4776-99a7-0b6c7cb67a05.mock.pstmn.io/planner")
      .then((response) => {
        response.data.data.forEach((a) => {
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