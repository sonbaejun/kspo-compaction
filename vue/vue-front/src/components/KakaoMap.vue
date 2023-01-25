<template>
  <div>
    <div>
      <router-link to="/planner">리스트페이지</router-link>
    </div>
    <button @click="zoom(1)">+</button> <button @click="zoom(-1)">-</button>
    <div class="maparea">
      <div class="searchbox">
        <div>
          <input
            type="text"
            placeholder="장소를 검색해주세요."
            @keyup.enter="searchPlaces"
          />
        </div>
        <div class="results">
          <div class="place" v-for="rs in search.results" :key="rs.id">
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
      <button @click="savePlan">플랜저장하기</button>
      <!-- <button @click="getPlan">플랜갖고오기</button> -->
      <div class="plan" v-for="rs in planner.plan" :key="rs.name">
        <h4>{{ rs.name }}</h4>
        <input type="text" v-model="rs.memo" placeholder="메모를 입력하세요." />
        <input type="text" v-model="rs.date" placeholder="YYYY-MM-DD HH:MM" />
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
        title: "test",
        intro: "intro",
        start_date: "2022-01-02T13:00+09:00",
        end_date: "2022-02-02T01:00+09:00",
        plan: [],
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
    // localhost:8080/planner/{id}
    axios
      .get(
        "https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/api/v1/planner"
      )
      .then((response) => {
        response.data.plan.forEach((a) => {
          this.planner.plan.push(a);
        });
      })
      .catch(() => {
        console.log("실패");
      });
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
      obj.date = "2023-01-01 01:30";
      obj.x = rs.x;
      obj.y = rs.y;
      this.planner.plan.push(obj);
    },
    // localhost:8080/api/v1/planner
    savePlan() {
      axios
        .post("https://reqres.in/api/users", this.planner)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPlan() {},
    setCenter(rs) {
      // 이동할 위도 경도 위치를 생성합니다
      let moveLatLon = new window.kakao.maps.LatLng(rs.y, rs.x);

      // 지도 중심을 이동 시킵니다
      this.map.setCenter(moveLatLon);
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
</style>
    