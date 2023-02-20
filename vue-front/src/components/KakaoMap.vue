<template>
  <div>
    <div class="text-center" style="z-index: 1000000; background-color: white">
      <v-row justify="center">
        <v-dialog v-model="showDialog" scrollable width="auto">
          <v-card>
            <v-card-title>여행테마 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <v-radio-group v-model="planner.concept" column>
                <v-radio label="식도락" value="식도락"></v-radio>
                <v-radio label="액티비티" value="액티비티"></v-radio>
                <v-radio label="관광명소" value="관광명소"></v-radio>
                <v-radio label="힐링" value="힐링"></v-radio>
                <v-radio label="호캉스" value="호캉스"></v-radio>
                <v-radio label="산악여행" value="산악여행"></v-radio>
                <v-radio label="캠핑" value="캠핑"></v-radio>
              </v-radio-group>
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
            <v-card-title>여행테마 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px; width: 600px">
              <v-select
                label="Select"
                v-model="planner.placeList"
                :items="[
                  '서울',
                  '대전',
                  '대구',
                  '부산',
                  '광주',
                  '울산',
                  '인천',
                  '경기',
                  '강원도',
                  '경남',
                  '전라도',
                  '제주도',
                  '경북',
                  '충청도',
                ]"
                multiple
              ></v-select>
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
      <v-date-picker v-model="start_date">
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
      style="z-index: 1000000; height: 100px; background-color: transparent"
    >
      <v-date-picker v-model="end_date">
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
            label="Title"
            hide-details="auto"
            v-model="title"
          ></v-text-field>
          <v-text-field label="Intro" v-model="intro"></v-text-field>
          <v-text-field
            label="Start"
            v-model="start_date"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              startDatePicker = 1;
              endDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="End"
            v-model="end_date"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              endDatePicker = 1;
              startDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="Concept"
            v-model="planner.concept"
            style="margin-top: 0px; padding-top: 0px"
            @click="showDialog = true"
            readonly
          ></v-text-field>
          <v-text-field
            label="Place"
            v-model="planner.placeList"
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
    <div style="margin-top: 15px; margin-left: 33px">
      <v-btn
        variant="flat"
        style="
          background-color: #1bc6ec;
          color: white;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          border-radius: 8px;
        "
        class="searchView"
        @click="searchView"
        >검색창 여닫이</v-btn
      >
      <v-btn
        @click="savePlan"
        variant="flat"
        style="
          background-color: #1bc6ec;
          color: white;
          font-family: 'Inter';
          font-sty le: normal;
          font-weight: 700;
          border-radius: 8px;
        "
        >플랜저장하기</v-btn
      >
    </div>
    <!-- <button @click="modal = 1">여행정보수정</button> -->

    <div class="maparea" style="margin-left: 35px; margin-top: 10px">
      <div class="searchbox" v-if="searchbox == 1">
        <div>
          <input
            type="text"
            placeholder="장소를 검색해주세요."
            @keyup.enter="searchPlaces"
          />
        </div>
        <div class="results">
          <div class="place" v-for="rs in search.results" :key="rs.place_name">
            <h4 @click="setCenter(rs)" style="cursor: pointer">
              {{ rs.place_name }}
            </h4>
            <div class="addr">
              <h5>{{ rs.address_name }}</h5>
            </div>
            <button @click="addPlan(rs)">+</button>
          </div>
        </div>
      </div>
      <div id="map"></div>
    </div>
    <div class="planner" style="margin-left: 35px">
      <div class="dateResult" v-for="(rs, i) in dateResult" :key="rs.date">
        <h4 @click="showDate(rs)">Day{{ i + 1 }}</h4>
        <div v-if="rs.view == 1"></div>
      </div>
      <!-- <button @click="getPlan">플랜갖고오기</button> -->
      <div class="plan" v-for="(rs, idx) in planner.planList" :key="idx">
        <div v-if="checkDay(rs)">
          <button @click="deletePlan(idx)">X</button>
          <h4>{{ rs.name }}</h4>
          <input
            type="text"
            v-model="rs.memo"
            placeholder="메모를 입력하세요."
          />
          <input type="text" v-model="rs.date" placeholder="YYYY-MM-DD HH:MM" />
          <!--           <div>
            <v-checkbox v-model="landscape" label="Landscape"></v-checkbox>
            <v-time-picker
              v-model="picker"
              :landscape="landscape"
            ></v-time-picker>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import axios from "axios";
import { store } from "../store/store";

export default {
  name: "KakaoMap",
  data() {
    return {
      modal: 1,
      searchbox: 1,
      title: "",
      intro: "",
      start_date: "",
      end_date: "",
      curDate: "",
      dayCnt: 0,
      startDatePicker: 0,
      endDatePicker: 0,
      showDialog: false,
      showSelected: false,
      dateResult: [],
      place: [],
      mapOption: {
        center: {
          lat: 33.450701,
          lng: 126.570667,
        },
        level: 8,
      },
      search: {
        keyword: null,
        pgn: null,
        results: [],
      },
      planner: {
        title: "",
        intro: "",
        start_date: "",
        end_date: "",
        nickname: "",
        concept: "",
        placeList: [],
        planList: [],
      },
      map: null,
      plan: [],
      plan2: [],
    };
  },
  watch: {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵 그릴 준비가 되어 있다면 맵 실행
      this.loadMap();
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript();
    }
    /*  // localhost:8080/planner/{id}
    axios
      .get("http://localhost:8080/api/v1/planner")
      .then((response) => {
        response.data.plan.forEach((a) => {
          this.planner.planList.push(a);
        });
      })
      .catch((err) => {
        console.log(err);
      }); */
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
    // 지도 크기 조정(level값)
    zoom(div) {
      let level = this.map.getLevel();
      if (div == 1) {
        this.map.setLevel(level - 1);
      } else if (div == -1) {
        this.map.setLevel(level + 1);
      }
    },
    searchPlaces(e) {
      const keyword = e.target.value.trim();
      if (keyword.length === 0) {
        return;
      }

      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data, status, pgn) => {
        this.search.keyword = keyword;
        this.search.pgn = pgn;
        this.search.results = data;
      });
    },
    addPlan(rs) {
      let obj = {};
      obj.name = rs.place_name;
      obj.memo = "";
      obj.date = this.curDate;
      obj.x = rs.x;
      obj.y = rs.y;
      this.planner.planList.push(obj);
    },
    // localhost:8080/api/v1/planner/post
    savePlan() {
      this.planner.title = this.title;
      this.planner.intro = this.intro;
      this.planner.start_date = this.start_date;
      this.planner.end_date = this.end_date;
      this.planner.nickname = this.$store.state.userInfo.nickname;
      this.place.forEach((a) => {
        let obj = {
          place: a,
        };
        this.planner.placeList.push(obj);
      });
      console.log(this.planner);
      //https://reqres.in/api/users
      //http://localhost:8080/api/v1/planner/post
      axios({
        method: "post", // [요청 타입]
        url: "https://reqres.in/api/users", // [요청 주소]
        data: JSON.stringify(this.planner), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-AUTH-TOKEN": localStorage.getItem("access_token"),
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then((response) => {
          console.log("RESPONSE : " + JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log("ERROR : " + JSON.stringify(error));
        });
      setTimeout(() => {
        this.$router.push({ path: "/planList" });
      }, 100);
    },
    doneBtn() {
      this.startDatePicker = 0;
      this.endDatePicker = 0;
      let date1 = new Date(this.start_date);
      let date2 = new Date(this.end_date);
      let dateDiff = date1 < date2;
      if (
        this.start_date != "" &&
        this.end_date != "" &&
        this.title != "" &&
        this.intro != "" &&
        dateDiff
      ) {
        this.modal = 0;
        let curDate1 = new Date(this.start_date.substring(0, 10));
        while (curDate1 <= new Date(this.end_date.substring(0, 10))) {
          this.dateResult.push({
            date: curDate1.toISOString().split("T")[0] + "T00:00",
            view: 0,
          });
          curDate1.setDate(curDate1.getDate() + 1);
        }
        this.curDate = this.dateResult[0].date;
      } else {
        alert("잘못된 형식입니다(공백 또는 날짜 형식을 확인해주세요)");
      }
    },
    searchView() {
      if (this.searchbox == 1) {
        this.searchbox = 0;
      } else {
        this.searchbox = 1;
      }
    },
    getPlan() {},
    setCenter(rs) {
      // 이동할 위도 경도 위치를 생성합니다
      let moveLatLon = new window.kakao.maps.LatLng(rs.y, rs.x);

      // 지도 중심을 이동 시킵니다
      this.map.setCenter(moveLatLon);
    },
    showDate(rs) {
      rs.view = 1;
      this.curDate = rs.date;
    },
    checkDay(rs) {
      if (rs.date.substring(0, 10) == this.curDate.substring(0, 10)) {
        return true;
      } else {
        return false;
      }
    },
    deletePlan(idx) {
      this.planner.planList.splice(idx, 1);
      console.log(this.planner);
    },
  },
};
</script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
#map {
  flex: 1 1 auto;
  height: 500px;
}
.maparea {
  width: 80%;
  display: flex;
  position: relative;
}
.maparea h4 {
  margin: 0;
}
.maparea h5 {
  margin: 0;
}
.searchbox {
  position: absolute;
  top: 0;
  left: 0;
  height: 500px;
  z-index: 10000;
  background-color: #ffffffaa;
  overflow-y: auto;
  width: 250px;
  display: flex;
  flex-direction: column;
}

.place {
  padding: 8px;
}
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
.plan input {
  margin: 3px;
}

.planner button {
  margin: 3px;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 60000;
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 70%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;

  flex-direction: column;
}

.white-bg input {
  width: 80%;
  margin: 5px;
  vertical-align: middle;
}

.white-bg button {
  width: 81%;
  margin: 5px;
  vertical-align: middle;
}

.dateResult h4 {
  cursor: pointer;
}
</style>
