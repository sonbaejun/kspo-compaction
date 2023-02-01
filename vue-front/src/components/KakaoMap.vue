<template>
  <div>
    <div class="black-bg" v-if="modal == 1">
      <div class="white-bg">
        <input v-model="title" placeholder="제목을 입력하세요" />
        <input v-model="intro" placeholder="설명을 입력하세요" />
        <input
          v-model="start_date"
          value="2022-01-02T13:00+09:00"
          placeholder="시작날짜를 입력하세요"
        />
        <input
          v-model="end_date"
          value="2022-01-05T13:00+09:00"
          placeholder="종료날짜를 입력하세요"
        />
        <button @click="doneBtn">확인</button>
      </div>
    </div>
    <div>
      <router-link to="/api/v1/planner">리스트페이지</router-link>
    </div>
    <button @click="zoom(1)">+</button> <button @click="zoom(-1)">-</button>
    <button class="searchView" @click="searchView">검색창 여닫이</button>
    <button @click="savePlan">플랜저장하기</button>
    <!-- <button @click="modal = 1">여행정보수정</button> -->

    <div class="maparea">
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
    <div class="planner">
      <div class="dateResult" v-for="(rs, i) in dateResult" :key="rs.date">
        <h4 @click="showDate(rs)">Day{{ i + 1 }}</h4>
        <div v-if="rs.view == 1"></div>
      </div>
      <!-- <button @click="getPlan">플랜갖고오기</button> -->
      <div class="plan" v-for="(rs, idx) in planner.planList" :key="idx">
        <div v-if="checkDay(rs)">
          <h4>{{ rs.name }}</h4>
          <input
            type="text"
            v-model="rs.memo"
            placeholder="메모를 입력하세요."
          />
          <input type="text" v-model="rs.date" placeholder="YYYY-MM-DD HH:MM" />
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import axios from "axios";

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
      dateResult: [],
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
      console.log(this.planner);
      axios({
        method: "post", // [요청 타입]
        url: "http://localhost:8080/api/v1/planner/post", // [요청 주소]
        data: JSON.stringify(this.planner), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then(function (response) {
          console.log("");
          console.log("RESPONSE : " + JSON.stringify(response.data));
          console.log("");
        })
        .catch(function (error) {
          console.log("");
          console.log("ERROR : " + JSON.stringify(error));
          console.log("");
        });
      setTimeout(() => {
        this.$router.push({ path: "/api/v1/planner" });
      }, 100);
    },
    doneBtn() {
      if (this.start_date != "" && this.end_date != "") {
        this.modal = 0;
        let curDate1 = new Date(this.start_date.substring(0, 10));
        while (curDate1 <= new Date(this.end_date.substring(0, 10))) {
          this.dateResult.push({
            date: curDate1.toISOString().split("T")[0] + "T00:00+09:00",
            view: 0,
          });
          curDate1.setDate(curDate1.getDate() + 1);
        }
        this.curDate = this.dateResult[0].date;
      } else {
        alert("날짜를 설정해주세요!");
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
      if (rs.date == this.curDate) {
        return true;
      } else {
        return false;
      }
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
