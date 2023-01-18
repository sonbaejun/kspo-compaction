<template>
  <div>
    <div>
      <button @click="savePlan">플랜저장하기</button>
    </div>
    <div class="searchbox">
      <div>
        <input type="text" value="창원대학교" @keyup.enter="searchPlaces" />
      </div>
      <div class="results">
        <div class="place" v-for="rs in search.results" :key="rs.id">
          <h4>{{ rs.place_name }}</h4>
          <h4>{{ rs.x }}</h4>
          <h4>{{ rs.y }}</h4>
          <input type="text" placeholder="메모를 입력하세요" />
          <button @click="addPlan(rs)">+</button>
        </div>
      </div>
    </div>
    <button @click="zoom(1)">+</button> <button @click="zoom(-1)">-</button>
    <div id="map"></div>
  </div>
</template>
  
<script>
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
      map: null,
      plan: [],
      plan2: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵 그릴 준비가 되어 있다면 맵 실행
      this.loadMap();
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript();
    }
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
        console.log(data);
        this.search.keyword = keyword;
        this.search.pgn = pgn;
        this.search.results = data;
      });
    },
    addPlan(rs) {
      let obj = {};
      obj.placeName = rs.place_name;
      obj.x = rs.x;
      obj.y = rs.y;
      console.log(this.plan);
      this.plan.push(obj);
    },
    savePlan() {
        this.plan2.target.push(this.plan);
        console.log(this.plan2);
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
#map {
  width: 100%;
  height: 400px;
}
.place {
  border: 1px solid red;
}

.result {
    overflow: scroll;
}
</style>
  