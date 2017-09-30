/**
 * @file js入口文件
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import axios from './axios';
import App from './App';
import router from './router';
import store from './store';

sync(store, router);

Vue.prototype.$http = axios;
const Application = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

export default Application;
