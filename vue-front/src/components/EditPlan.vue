<template>
  <div>
    <div class="text-center" style="z-index: 1000000; background-color: white">
      <v-row justify="center">
        <v-dialog v-model="showDialog" scrollable width="auto">
          <v-card>
            <v-card-title>여행테마 선택</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px">
              <v-radio-group v-model="concept" column>
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
                v-model="place"
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
      <div class="white-bg" style="margin: 50px 150px; width: 50%">
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
            v-model="concept"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              showDialog = true;
              endDatePicker = 0;
              startDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="Place"
            v-model="place"
            style="margin-top: 0px; padding-top: 0px"
            @click="showSelected = true"
            readonly
          ></v-text-field>
          <div>
            <v-radio-group v-model="planner.visibility" row>
              <v-radio label="공개" value="VTP200Y"></v-radio>
              <v-radio label="비공개" value="VTP403N"></v-radio>
              <h6 style="margin-top: 5px" v-if="checkVisibility()">
                ※공개를 선택할 경우 타인이 플래너를 조회할 수 있습니다.
              </h6>
            </v-radio-group>
          </div>
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
    <div style="margin-top: 15px; margin-left: 33px; white-space: nowrap">
      <v-btn
        @click="savePlan"
        variant="flat"
        style="
          background-color: #1bc6ec;
          color: white;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          border-radius: 8px;
          margin-right: 30px;
          width: 41%;
        "
        >플랜저장하기</v-btn
      >
      <v-btn
        @click="changeCartegory('AT4')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; border-radius: 8px"
        ><i class="fas fa-archway"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('PK6')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; border-radius: 8px"
        ><i class="fas fa-car"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('MT1')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; padding: 0px 0px"
        ><i class="fas fa-cart-plus"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('SW8')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; padding: 0px 0px"
        ><i class="fas fa-subway"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('AD5')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; padding: 0px 0px"
        ><i class="fas fa-house-user"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('FD6')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; padding: 0px 0px"
        ><i class="fas fa-utensils"></i
      ></v-btn>
      <v-btn
        @click="changeCartegory('CE7')"
        variant="flat"
        style="background-color: #1bc6ec; color: white; margin: 0px"
        ><i class="fas fa-mug-hot"></i
      ></v-btn>
    </div>
    <div
      style="
        width: 95%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 18px;
        margin-left: 35px;
      "
    >
      <v-card
        class="mx-auto"
        style="
          height: 600px;
          width: 8%;
          margin-left: 0;
          margin-right: 0;
          overflow-y: auto;
        "
        tile
      >
        <v-list dense style="padding: 0">
          <v-subheader style="background-color: #1bc6ec; color: aliceblue"
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
      <div
        style="
          width: 34%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          margin-left: 1px;
        "
      >
        <v-card
          class="mx-auto"
          style="height: 600px; width: 50%; overflow-y: auto"
          tile
        >
          <v-list dense style="padding: 0">
            <input
              class="searchInput"
              placeholder="SEARCH"
              @keyup.enter="searchPlaces"
            />
            <div v-for="rs in search.results" :key="rs.place_name">
              <v-list-item>
                <v-list-item-content>
                  <v-card elevation="5" outlined style="margin: 2px 0">
                    <div
                      style="
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        background-color: #1bc6ec;
                      "
                    >
                      <v-list-item-title
                        style="
                          margin: 7px 0px 15px 9px;
                          width: 80%;
                          cursor: pointer;
                          color: white;
                        "
                        @click="setCenter(rs)"
                        >{{ rs.place_name }}</v-list-item-title
                      >
                      <v-btn
                        style="
                          width: 10%;
                          padding: 0%;
                          background-color: aliceblue;
                          color: blue;
                        "
                        @click="addPlan(rs)"
                      >
                        <i class="fas fa-plus-circle"></i>
                      </v-btn>
                    </div>
                    <div class="addr" style="margin: 3px 9px">
                      <h5
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          font-size: 10px;
                          font-weight: 700;
                        "
                      >
                        {{ rs.address_name }}
                      </h5>
                      <a
                        :href="rs.place_url"
                        target="_blank"
                        style="
                          text-overflow: ellipsis;
                          overflow: hidden;
                          white-space: nowrap;
                          font-size: 10px;
                          font-weight: 700;
                        "
                      >
                        카카오맵 상세보기
                      </a>
                    </div>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
        <v-card
          class="mx-auto"
          style="height: 600px; width: 50%; overflow-y: auto"
          tile
        >
          <v-list dense style="padding: 0">
            <v-subheader
              style="
                background-color: #1bc6ec;
                color: aliceblue;
                position: sticky;
              "
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
                        background-color: #1bc6ec;
                        color: aliceblue;
                      "
                    >
                      <v-list-item-title
                        style="margin: 7px 0px 15px 9px; width: 80%"
                        >{{ rs.name }}</v-list-item-title
                      >
                      <v-btn
                        style="
                          width: 15%;
                          min-width: none;
                          padding: 0%;
                          background-color: aliceblue;
                          color: red;
                        "
                        @click="deletePlan(i)"
                        ><i class="fas fa-minus-circle"></i
                      ></v-btn>
                    </div>
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          solo
                          v-bind:value="getOrderDate(i)"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          @click="timepicker = i"
                          style="font-size: small; height: 45px"
                        ></v-text-field>
                      </template>
                      <div v-if="timepicker == i">
                        <v-time-picker
                          v-model="timepickerTime"
                          full-width
                        ></v-time-picker>
                        <v-btn
                          @click="doneTimePicker(rs)"
                          style="
                            background-color: #1bc6ec;
                            width: 100%;
                            color: white;
                            font-family: 'Inter';
                            font-style: normal;
                            font-weight: 700;
                            border-radius: 4px;
                          "
                          >done</v-btn
                        >
                      </div>
                    </v-menu>
                    <v-text-field
                      label="메모"
                      solo
                      v-model="rs.memo"
                      style="font-size: small; height: 45px"
                    ></v-text-field>
                  </v-card>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </div>
      <div class="maparea">
        <div id="map">
          <div style="width: 330px; height: 0px" ref="customOverlay">
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                background-color: #1bc6ec;
              "
            >
              <v-list-item-title
                style="margin: 7px 0px 7px 9px; width: 80%; color: white"
                >{{ markerInfo.place_name }}</v-list-item-title
              >
              <v-btn
                style="
                  width: 10%;
                  padding: 0%;
                  background-color: aliceblue;
                  color: blue;
                "
                @click="addPlan(markerInfo)"
              >
                <i class="fas fa-plus-circle"></i>
              </v-btn>
            </div>
            <div
              class="addr"
              style="background-color: white; padding: 2px 0px 0px 8px"
            >
              <h5
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  font-size: 10px;
                  font-weight: 700;
                  background-color: white;
                "
              >
                {{ markerInfo.address }}
              </h5>
              <a
                :href="markerInfo.url"
                target="_blank"
                style="
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  font-size: 10px;
                  font-weight: 700;
                "
              >
                카카오맵 상세보기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      modal: 0,
      searchbox: 1,
      title: this.$route.params.plan.title,
      intro: this.$route.params.plan.intro,
      start_date: this.$route.params.plan.start_date,
      end_date: this.$route.params.plan.end_date,
      concept: this.$route.params.plan.concept,
      place: [],
      placeStr: [],
      positions: [],
      curDate: "",
      dayCnt: 0,
      startDatePicker: 0,
      endDatePicker: 0,
      time: null,
      timepicker: null,
      map: null,
      timepickerTime: "00:00",
      selectedItem: 0,
      showDialog: false,
      showSelected: false,
      markers: [],
      curCartegory: "AT4",
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
        concept: "",
        placeList: [],
        planList: [],
        visibility: "VTP200Y",
      },
      markerInfo: {
        place_name: "",
        address: "",
        url: "",
        x: "",
        y: "",
      },
      customOverlay: {},
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
    this.planner.title = this.$route.params.plan.title;
    this.planner.intro = this.$route.params.plan.intro;
    this.planner.start_date = this.$route.params.plan.start_date;
    this.planner.end_date = this.$route.params.plan.end_date;
    this.id = this.$route.params.id;
    this.concept = this.$route.params.plan.concept;
    this.$route.params.plan.placeList.forEach((a) => {
      this.place.push(a.place);
      this.placeStr.push(a.place);
    });
    this.modal = 1;
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
      // let positions = [];

      this.map = new window.kakao.maps.Map(container, options);
      kakao.maps.event.addListener(this.map, "idle", this.searchCartegory);
      this.searchCartegoryForLoadMap();
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
        console.log(this.search.results);
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
      this.planner.concept = this.concept;
      console.log(this.place);
      this.place.forEach((a) => {
        let obj = {
          place: a,
        };
        this.planner.placeList.push(obj);
      });
      console.log(this.planner.placeList);
      console.log(this.planner);
      // http://localhost:8080/api/v1/planner/update/${this.id}
      // https://reqres.in/api/users/2
      axios({
        method: "put", // [요청 타입]
        url: `http://localhost:8080/api/v1/planner/update/${this.id}`, // [요청 주소]
        data: JSON.stringify(this.planner), // [요청 데이터]
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-AUTH-TOKEN": localStorage.getItem("access_token"),
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        //responseType: "json" // [응답 데이터 : stream , json]
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
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
      let dateDiff = date1 <= date2;
      if (
        this.start_date != "" &&
        this.end_date != "" &&
        this.title != "" &&
        this.intro != "" &&
        dateDiff
      ) {
        this.$route.params.plan.planList.forEach((a) => {
          console.log(a);
          this.planner.planList.push(a);
        });
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
    doneTimePicker(rs) {
      let date = rs.date.substring(0, 11);
      rs.date = `${date}${this.timepickerTime}`;
      this.timepicker = null;
      this.timepickerTime = "00:00";
    },
    getOrderDate(idx) {
      return this.planner.planList[idx].date.substring(11, 16);
    },
    searchCartegoryForLoadMap() {
      let ps2 = new window.kakao.maps.services.Places(this.map);
      ps2.categorySearch(this.curCartegory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    searchCartegory() {
      this.removeMarkers();
      this.customOverlay.setMap(null);
      this.positions.length = 0;
      this.markers.length = 0;
      let ps2 = new window.kakao.maps.services.Places(this.map);
      ps2.categorySearch(this.curCartegory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    placesSearchCB(data, status, pagination) {
      for (let i = 0; i < data.length; i++) {
        this.displayMarker(data[i]);
      }
      setTimeout(() => {
        for (let i = 0; i < this.positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(24, 35);
          var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          // 마커를 생성합니다
          let marker = new window.kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: this.positions[i].latlng, // 마커를 표시할 위치
            title: this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          /* 마커에 클릭이벤트 등록 */
          kakao.maps.event.addListener(marker, "click", () => {
            this.displayPlaceInfo(this.positions[i]);
          });
          this.markers.push(marker);
        }
      }, 100);
    },
    displayMarker(place) {
      let markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      let obj = {
        title: place.place_name,
        latlng: markerPosition,
        address: place.address_name,
        x: place.x,
        y: place.y,
        url: place.place_url,
      };
      this.positions.push(obj);
    },
    removeMarkers() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
    },
    changeCartegory(car) {
      this.customOverlay.setMap(null);
      this.removeMarkers();
      this.markers.length = 0;
      this.curCartegory = car;
      this.searchCartegory();
    },
    displayPlaceInfo(place) {
      this.markerInfo.place_name = place.title;
      this.markerInfo.address = place.address;
      this.markerInfo.url = place.url;
      this.markerInfo.x = place.x;
      this.markerInfo.y = place.y;

      var content = this.$refs.customOverlay;
      this.customOverlay = new kakao.maps.CustomOverlay({
        position: place.latlng,
        content: content,
      });
      // 커스텀 오버레이를 지도에 표시합니다
      this.customOverlay.setMap(this.map);
    },
    checkVisibility() {
      if (this.planner.visibility == "VTP200Y") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
  
<style>
#map {
  flex: 1 1 auto;
  height: 600px;
}
.maparea {
  width: 58%;
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
  height: 600px;
  z-index: 10000;
  /* background-color: #ffffffaa;
  color: rgb(21, 20, 20); */
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
}

.searchbox::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.v-text-field::lable {
  color: aliceblue;
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

.searchInput {
  color: aliceblue;
  font-size: small;
  width: 100%;
  padding-left: 10px;
  padding-right: 5px;
  height: 40px;
  background-color: #1bc6ec;
  border-color: white;
}

.searchInput::placeholder {
  color: aliceblue;
  font-size: 12px;
}
.searchInput:focus {
  outline: 2px solid white;
}

.mx-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
  