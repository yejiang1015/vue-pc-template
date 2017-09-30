/**
 * @file store(vuex)主入口
 *
 * @Author: haiyangJ
 * @Date: 2016-10-27 10:27:42
 */

import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins';

import * as actions from './actions';
import * as getters from './getters';
import { state, mutations } from './mutations';
// import login from './modules/login';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    // login,
  },
  strict: debug,
  plugins
});

export default store;
