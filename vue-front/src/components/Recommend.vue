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
      <v-date-picker v-model="planner.start_date" style="z-index: 1">
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
      style="z-index: 100000000; height: 100px; background-color: transparent"
    >
      <v-date-picker v-model="planner.end_date" style="z-index: 1">
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
            label="Start"
            v-model="planner.start_date"
            style="margin-top: 0px; padding-top: 0px"
            @click="
              startDatePicker = 1;
              endDatePicker = 0;
            "
            readonly
          ></v-text-field>
          <v-text-field
            label="End"
            v-model="planner.end_date"
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      modal: 1,
      planner: {
        start_date: "",
        end_date: "",
        concept: "",
        placeList: [],
      },
      startDatePicker: 0,
      endDatePicker: 0,
      showDialog: false,
      showSelected: false,
      dateResult: [],
      place: [],
    };
  },
  methods: {
    doneBtn() {
      this.startDatePicker = 0;
      this.endDatePicker = 0;
      let date1 = new Date(this.planner.start_date);
      let date2 = new Date(this.planner.end_date);
      let dateDiff = date1 <= date2;
      this.place.forEach((a) => {
        let obj = {
          place: a,
        };
        this.planner.placeList.push(obj);
      });
      console.log(this.planner);
      if (
        this.planner.start_date != "" &&
        this.planner.end_date != "" &&
        dateDiff
      ) {
        // https://reqres.in/api/users
        // http://localhost:8080/api/v1/recommend
        axios({
          method: "post", // [요청 타입]
          url: "http://localhost:8080/api/v1/recommend", // [요청 주소]
          data: JSON.stringify(this.planner), // [요청 데이터]
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "X-AUTH-TOKEN": localStorage.getItem("access_token"),
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
        this.modal = 0;
      } else {
        alert("잘못된 형식입니다(공백 또는 날짜 형식을 확인해주세요)");
      }
    },
  },
};
</script>

<style>
</style>