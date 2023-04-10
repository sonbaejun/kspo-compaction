<template>
  <div>
    <div class="planbox">
      <i class="fas fa-bookmark" style="margin: 3px 3px 0px 12px"></i>
      <h4>플래너 상세보기</h4>
    </div>
    <v-row>
      <v-col
        cols="12"
        sm="3"
        style="max-width=100%; padding: 12px 0px 0px 35px;"
      >
        <div>
          <div>
            <v-card
              elevation="8"
              style="
                width: 100%;
                height: 200px;
                border-radius: 10px;
                background-color: white;
                color: black;
              "
            >
              <div style="padding-left: 15px; padding-top: 5px">
                <v-btn
                  v-if="checkUser == 1"
                  class="deleteBtn"
                  @click="deletePlan"
                  elevation="1"
                  style="
                    background-color: white;
                    color: black;
                    border-radius: 6px;
                  "
                  >삭제</v-btn
                >
                <v-btn
                  v-if="checkUser == 1"
                  class="editBtn"
                  @click="goEdit"
                  style="
                    background-color: rgba(0, 153, 255, 0.884);
                    color: white;
                    border-radius: 6px;
                  "
                  >수정</v-btn
                >
                <v-btn
                  v-else-if="checkUser == 0"
                  class="editBtn"
                  @click="goKakaoMap"
                  style="
                    background-color: rgba(0, 153, 255, 0.884);
                    color: white;
                    border-radius: 6px;
                  "
                  >복사하기</v-btn
                >
              </div>
              <div style="overflow-x: hidden; padding-top: 7px">
                <i
                  class="fas fa-star"
                  style="float: left; margin: 8px 5px 0px 15px"
                ></i>
                <v-card-title style="padding: 0px; white-space: nowrap">{{
                  planner.title
                }}</v-card-title>
              </div>
              <div style="overflow-x: hidden">
                <i
                  class="fas fa-pencil"
                  style="float: left; margin: 3px 5px 0px 15px"
                ></i>
                <v-card-subtitle style="padding: 0px; white-space: nowrap">{{
                  planner.intro
                }}</v-card-subtitle>
              </div>
              <div style="overflow-x: hidden; padding-top: 12px">
                <i
                  class="fas fa-calendar"
                  style="float: left; margin: 3px 5px 0px 15px"
                ></i>
                <v-card-text style="padding: 0px; white-space: nowrap">{{
                  planner.start_date + " - " + planner.end_date.substring(5, 10)
                }}</v-card-text>
              </div>
              <div style="overflow-x: hidden">
                <i
                  class="fas fa-key"
                  style="float: left; margin: 3px 5px 0px 15px"
                ></i>
                <v-card-text style="padding: 0px; white-space: nowrap">{{
                  planner.concept
                }}</v-card-text>
              </div>
              <div style="overflow-x: hidden">
                <i
                  class="fas fa-map"
                  style="float: left; margin: 3px 5px 0px 15px"
                ></i>
                <v-card-text style="padding: 0px; white-space: nowrap">{{
                  place
                }}</v-card-text>
              </div>
            </v-card>
          </div>
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              margin-top: 10px;
            "
          >
            <v-card
              class="mx-auto"
              elevation="6"
              style="
                height: 450px;
                width: 35.9%;
                margin-left: 0;
                margin-right: 0;
                overflow-y: auto;
              "
              tile
            >
              <v-list dense style="padding: 0">
                <div class="searchIcon calendarIcon">
                  <i class="fas fa-calendar"></i>
                </div>
                <v-subheader style="margin-left: 20px; font-weight: 700"
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
              elevation="6"
              style="height: 450px; width: 63.9%; overflow-y: auto"
              tile
            >
              <v-list dense style="padding: 0">
                <div class="searchIcon editIcon">
                  <i class="fas fa-edit"></i>
                </div>
                <v-subheader style="margin-left: 20px; font-weight: 700"
                  >PLAN</v-subheader
                >
                <div v-for="(rs, i) in planner.planList" :key="i">
                  <v-list-item v-if="checkDay(rs)">
                    <v-list-item-content>
                      <v-card elevation="5" outlined style="margin: 2px 0">
                        <div
                          style="
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-start;
                            border-bottom: solid 1px #e0e0e0;
                          "
                        >
                          <div class="planNumber">
                            <h4>{{ i + 1 }}</h4>
                          </div>
                          <v-list-item-title
                            style="
                              cursor: pointer;
                              padding: 3px 5px 2px 2px;
                            "
                            @click="setCenter(rs)"
                            >{{ rs.name }}</v-list-item-title
                          >
                        </div>
                        <v-list-item-title
                          style="
                            padding: 5px;
                            padding-left: 14px;
                            border-bottom: solid 1px #e0e0e0;
                          "
                          >{{ rs.memo }}</v-list-item-title
                        >
                        <v-list-item-title
                          style="margin: 5px; margin-left: 14px"
                          >{{ rs.date.substring(11, 16) }}</v-list-item-title
                        >
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="9">
        <div class="maparea">
          <div id="map"></div>
        </div>
      </v-col>
    </v-row>
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
      nickname: "",
      map: null,
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
    };
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=481f069feb92ed44bf85d3126b832741&libraries=services&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap); //script load가 끝난 뒤 지도 실행

      document.head.appendChild(script);
    },
    loadMap() {
      // 지도를 담을 DOM 영역
      const container = document.getElementById("map");
      // 지도 초기 정보
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },
    setCenter(rs) {
      console.log(rs);
      // 이동할 위도 경도 위치를 생성합니다
      let moveLatLon = new window.kakao.maps.LatLng(rs.y, rs.x);

      // 지도 중심을 이동 시킵니다
      this.map.setCenter(moveLatLon);

      var imageSize = new window.kakao.maps.Size(24, 35);
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      // 마커 이미지를 생성합니다
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      // 마커가 표시될 위치입니다
      let markerPosition = new window.kakao.maps.LatLng(rs.y, rs.x);

      // 마커를 생성합니다
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커 이미지
        title: rs.name,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
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
          .then((response) => {
            console.log("RESPONSE : " + JSON.stringify(response.data));
            setTimeout(() => {
              this.$router.push({ path: "/planList" });
            }, 100);
          })
          .catch(function (error) {
            console.log("ERROR : " + JSON.stringify(error));
          });
      }
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
    sortDate1(list) {
      const sorted_list = list.sort((a, b) => {
        return new Date(a.date.substring(0,10)).getTime() - new Date(b.date.substring(0,10)).getTime();
      });
      return sorted_list;
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵 그릴 준비가 되어 있다면 맵 실행
      this.loadMap();
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript();
    }
    /* http://localhost:8080/api/v1/planner/detail/${this.id} */
    /* https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner */
    this.id = this.$route.params.id;
    axios
      .get(
        `https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner`,
        {
          headers: {
            "X-AUTH-TOKEN": `${localStorage.getItem("access_token")}`,
          },
        }
      )
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
      .catch((err) => {
        console.log(err);
      });
    this.id = this.$route.params.id;
    console.log(this.planner.planList);
    this.planner.planList = this.sortDate1(this.planner.planList);
  },
};
</script>

<style scoped>
#map {
  flex: 1 1 auto;
  height: 600px;
  height: 655px;
}
.maparea {
  margin-right: 30px;
  margin-left: 20px;
}
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
.searchIcon {
  position: absolute;
  height: 40px;
  width: 20px;
  padding-top: 10px;
  padding-left: 9px;
  z-index: 3;
  font-size: 13px;
}

.planbox {
  background-color: whitesmoke;
  padding: 8px !important;
  border-radius: 10px;
  border: solid #f8f8f8 3px;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.planNumber {
  border-radius: 50%;
  border: none;
  background: #7c30f5e6;
  color: white;
  width: 1vw;
  height: 1vw;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: 3px;
  display: flex;
  -webkit-box-align: center;
  margin-left: 12px;
  padding-bottom: 1px;
  align-items: center;
}
.planNumber h4 {
  margin: 0;
  font-size: 12px;
  line-height: 1vw;
  text-align: center;
  width: 1vw;
}
</style>
