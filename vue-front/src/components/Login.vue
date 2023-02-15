<template>
  <div style="margin-right: 30px">
    <div class="Icon">
      <img
        src="../assets/image 4.png"
        style="
          margin-left: 10px;
          margin-right: 2px;
          margin-top: 5px;
          border-radius: 10px;
          height: 70px;
          width: 64px;
        "
      />
      <h4
        style="
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 37px;
          line-height: 51px;
          color: #1bc6ec;
        "
      >
        ClickTour
      </h4>
    </div>
    <v-sheet width="300" class="mx-auto" style="margin-top: 30px">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="firstName" label="아이디"></v-text-field>
        <v-text-field v-model="lastName" label="비밀번호"></v-text-field>
        <v-btn
          type="submit"
          block
          class="mt-2"
          style="background-color: #1bc6ec; color: white; border-radius: 10px"
          >로그인</v-btn
        >
      </v-form>
      <div style="clear: both">
        <h4 class="other">회원가입</h4>
        <h4 class="other">ID/PW 찾기</h4>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
};
</script>

<style>
.Icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  margin-right: 47px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}

.other {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 10;
  line-height: 31px;
  display: flex;
  align-items: center;
  float: left;
  margin: 15px 0px 0px 50px;

  color: #b3b3b3;
}
</style>