<template>
  <div>
    <h4>hello!</h4>
    <div>
      <router-link to="/planner/id">플랜짜러가기</router-link>
    </div>
    <div>
      <router-link to="/">메인화면으로</router-link>
    </div>
    <div class="plan" v-for="rs in planner.data" :key="rs.name">
      <h4>{{ rs.title }}</h4>
      <h5>{{ rs.intro }}</h5>
      <h5>{{ rs.start_date }}</h5>
      <h5>{{ rs.end_date }}</h5>
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
  methods: {},
  mounted() {
    // localhost:8080/planner
    axios
      .get("https://f86a523c-df58-4776-99a7-0b6c7cb67a05.mock.pstmn.io/planner")
      .then((response) => {
        console.log(response.data);
        response.data.data.forEach((a) => {
          console.log(a);
          this.planner.data.push(a);
        });
      })
      .catch(() => {
        console.log("실패");
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
}

.plan h4 {
  margin: 0;
}
.plan h5 {
  margin: 0;
}
</style>