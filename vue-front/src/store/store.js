import Vuex from "vuex";
import Vue from 'vue';
import axios from "axios";

Vue.use(Vuex);

// store 생성
export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem("access_token"),
        isLogin: false,
        userInfo: {
            nickname: JSON.parse(localStorage.getItem("userInfo")).nickname,
        },
        counter: 0,
    },
    getters: {
        isLogin(state) {
            return state.userInfo == null ? false : true;
        }
    },
    mutations: {  // commit 으로 부를 수 있다.
        setToken(state, _token) {
            state.token = _token;
        },
        setIsLogin(state, _isLogin) {
            state.isLogin = _isLogin;
        },
        setuserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        inituserInfo(state) {
            state.userInfo.nickname = "";
        },
        initToken(state) {
            state.token = null;
        }

    },
    actions: { // dispatch 로 부를 수 있다.
        setToken: ({ commit }, _token) => {
            commit('setToken', _token);
        },
        setuserInfo: ({ commit }, userInfo) => {
            commit('setuserInfo', userInfo);
        },
    }
})