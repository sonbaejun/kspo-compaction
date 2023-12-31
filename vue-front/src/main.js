// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import Vuex from 'vuex'


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
// createApp(App).use(router).mount('#app')
//iconfont 인스턴스화 중에 옵션 추가
export default new Vuetify({
  icons: {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
  }
})

import { store } from "./store/store";

Vue.use(Vuetify)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
    }
  }),
})
