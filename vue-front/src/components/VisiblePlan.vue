<template>
  <div>
    <!-- <div style="text-align: center;">
      <div class="main-component">
        <v-row no-gutters style="padding-left: 110px; padding-right: 60px">
          <v-col
            cols="12"
            sm="6"
            @click="goComponents('recommend')"
            style="height: 300px; cursor: pointer; border-radius: 50%"
            justify-center
          >
            <v-card
              elevation="24"
              width="400px"
              style="border-radius: 5000px; margin-top: 27px"
            >
              <br />
              <button class="iconBtn1">
                <i class="fas fa-book" style="height: 90px"></i>
              </button>
              <h4 class="cardTitle">Recommend Plan!</h4>
              <h4 class="cardSubtitle">Click!</h4>
              <br />
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            @click="goComponents('recommend')"
            style="height: 300px; cursor: pointer; border-radius: 50%"
            justify-center
          >
            <v-card
              elevation="24"
              width="400px"
              style="border-radius: 5000px; margin-top: 27px"
            >
              <br />
              <button class="iconBtn1">
                <i class="fas fa-book" style="height: 90px"></i>
              </button>
              <h4 class="cardTitle">Recommend Plan!</h4>
              <h4 class="cardSubtitle">Click!</h4>
              <br />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div> -->
    <v-container class="bg-surface-variant" style="margin-top: 15px">
      <div class="planbox">
        <h4>많은 사람들의 플래너를 구경해보세요!</h4>
        <a @click="goComponent()" style="margin-left: auto"
          >내 플래너 목록으로 가기!</a
        >
      </div>
      <v-row no-gutters>
        <v-col v-for="rs in planner.data" :key="rs.name" cols="12" sm="3">
          <v-card class="ma-2 pa-2" max-width="344" style="height: 400px">
            <v-img
              @click="goPlan(rs)"
              style="cursor: pointer"
              :src="rs.url"
              height="200px"
              cover
            ></v-img>

            <v-card-title
              style="
                height: 20%;
                white-space: nowrap;
                padding: 0;
                overflow-x: hidden;
              "
            >
              {{ rs.title }}
            </v-card-title>
            <v-card-subtitle
              style="height: 20%; padding: 0; overflow-x: hidden"
            >
              {{ rs.intro }}
            </v-card-subtitle>
            <v-card-subtitle
              style="white-space: nowrap; padding: 0; overflow-x: hidden"
            >
              {{ rs.start_date.substring(0, 10) + " - " }}
              {{ rs.end_date.substring(5, 10) }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
      mapImg: {
        서울: "https://velog.velcdn.com/images/sonbaejun/post/62c9c806-447f-4ed3-a985-a79ff8863f26/image.png",
        대전: "https://velog.velcdn.com/images/sonbaejun/post/b0c88f93-72c3-4990-89f1-403fa9de63f9/image.png",
        대구: "https://velog.velcdn.com/images/sonbaejun/post/07ecc5e6-7e4a-4f50-8d38-83ea34c6cb53/image.png",
        부산: "https://velog.velcdn.com/images/sonbaejun/post/b9854730-713c-4627-adb6-87da5ef21d78/image.png",
        광주: "https://velog.velcdn.com/images/sonbaejun/post/cf7942e8-b13b-48a2-9468-3998e27c760f/image.png",
        울산: "https://velog.velcdn.com/images/sonbaejun/post/5a668efa-7fb0-4395-ace6-213d568c9ec3/image.png",
        인천: "https://velog.velcdn.com/images/sonbaejun/post/753cb7e8-4c26-4ea3-be3d-dc527f230496/image.png",
        경기도:
          "https://velog.velcdn.com/images/sonbaejun/post/a5818990-e7fb-42eb-83e5-0ff8ce0db778/image.png",
        강원도:
          "https://velog.velcdn.com/images/sonbaejun/post/09388686-76e4-47c7-addc-d9ac3238b5ca/image.png",
        경상남도:
          "https://velog.velcdn.com/images/sonbaejun/post/ae1c4a48-075b-46a5-a34a-cfbdadc21750/image.png",
        전라도:
          "https://velog.velcdn.com/images/sonbaejun/post/a6a9fe53-f866-47c9-a4b0-fbf233eae420/image.png",
        제주도:
          "https://velog.velcdn.com/images/sonbaejun/post/e8d3959d-7a79-4af4-985f-249de987e96a/image.png",
        경상북도:
          "https://velog.velcdn.com/images/sonbaejun/post/66f5c935-609a-4333-b673-04fadaf49420/image.png",
        충청도:
          "https://velog.velcdn.com/images/sonbaejun/post/59683b10-0bbf-49f0-9f03-4e19e578874d/image.png",
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
    goComponent() {
      this.$router.push("/planList").catch(() => {});
    },
  },
  mounted() {
    //https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/planner
    //http://localhost:8080/api/v1/planner/visible
    axios
      .get(
        "https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/planner"
      )
      .then((response) => {
        /* 서버 사용 시 data.? 내가 테스트할땐 data.data로 해야 돌아감 */
        response.data.data.forEach((a) => {
          this.planner.data.push(a);
          let placeImg = a.placeList[0].place;
          let val = this.mapImg[placeImg];
          a.url = val;
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
.planbox {
  background-color: whitesmoke;
  padding: 8px !important;
  margin: 8px !important;
  border-radius: 10px;
}
.cardTitle {
  margin-top: 10px;
  font-size: 18px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cardSubtitle {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.main-component {
  /* background-color: rgb(215, 250, 247); */
  /* padding-top: 10px; */
  border: 1px black;
}
</style>