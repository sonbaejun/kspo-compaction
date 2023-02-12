<template>
  <div>
    <div style="text-align: center">
      <v-btn
        depressed
        style="
          background-color: #1bc6ec;
          color: white;
          width: 50%;
          border-radius: 40px;
          height: 60px;
          align: center;
          margin-top: 30px;
        "
        @click="goWritePlan"
        >Make Plan!</v-btn
      >
    </div>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col v-for="rs in planner.data" :key="rs.name" cols="12" sm="4">
          <v-card class="ma-2 pa-2" max-width="344" style="height: 400px">
            <v-img
              @click="goPlan(rs)"
              style="cursor: pointer"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
              cover
            ></v-img>

            <v-card-title> {{ rs.title }} </v-card-title>
            <v-card-subtitle> {{ rs.intro }} </v-card-subtitle>
            <v-card-subtitle>
              {{ rs.start_date.substring(0, 10) + " to" }}
              {{ rs.end_date.substring(0, 10) }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- <div style="background-color: #d9d9d9">
      <v-col v-for="n in 1" :key="n" cols="12" sm="4">
        <div
          class="plan"
          v-for="rs in planner.data"
          :key="rs.name"
          style="margin: 15px"
        >
          <v-card style="" class="ma-2 pa-2" max-width="344">
            <v-img
              @click="goPlan(rs)"
              style="cursor: pointer"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
              cover
            ></v-img>
            <v-card-title> {{ rs.title }} </v-card-title>
            <v-card-subtitle style="padding: 0">
              {{ rs.intro }}
            </v-card-subtitle>
            <v-card-subtitle style="padding: 0">
              {{ rs.start_date.substring(0, 10) }}
            </v-card-subtitle>
          </v-card>
        </div>
      </v-col>
    </div> -->
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
    goWritePlan() {
      this.$router.push("/api/v1/planner/post").catch(() => {});
    },
  },
  mounted() {
    //https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/planner
    //http://localhost:8080/api/v1/planner
    axios
      .get(
        "https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/planner"
      )
      .then((response) => {
        /* 내가 테스트할땐 data.data로 해야 돌아감 */
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
