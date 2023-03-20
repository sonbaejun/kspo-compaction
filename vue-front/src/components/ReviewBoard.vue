<template>
  <div>
    <v-card style="width: 95%; margin-left: 35px">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="검색"
          single-line
          hide-details
        ></v-text-field>
        <v-btn
          class="mr-2"
          style="
            margin-left: 30px;
            background-color: #1bc6ec;
            color: white;
            border-radius: 10px;
          "
          @click="goReviewBoardWrite"
        >
          글쓰기
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="boardList" :search="search">
        <template v-slot:item="{ item }">
          <tr @click="handleClick(item)" style="cursor: pointer">
            <td>{{ item.title }}</td>
            <td>{{ item.nickname }}</td>
            <td>{{ item.createdDate }}</td>
            <td>{{ item.view }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "제목",
          align: "start",
          value: "title",
        },
        { text: "작성자", value: "nickname" },
        { text: "날짜", value: "createdDate", filterable: false },
        { text: "조회수", value: "view", filterable: false },
      ],
      boardList: [],
    };
  },
  mounted() {
    // https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/board/list
    // http://localhost:8080/api/v1/board/list
    axios
      .get(
        "https://42b1923e-9ac4-4979-b904-912c15c18ea6.mock.pstmn.io/localhost:8080/board/list"
      )
      .then((response) => {
        /* 서버 사용 시 data.? 내가 테스트할땐 data.data로 해야 돌아감 */
        response.data.data.forEach((a) => {
          this.boardList.push(a);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(item) {
      this.$router.push({ name: "ReviewBoardView", params: { id: item.id } });
    },
    goReviewBoardWrite() {
      this.$router.push({ name: "ReviewBoardWrite" });
    },
  },
};
</script>

<style>
.text-start {
  cursor: pointer;
}
</style>