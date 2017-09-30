/**
 * @file common模块的mutations
 *
 * @Author: haiyangJ
 * @Date: 2017-04-17 17:05:42
 */

import * as types from './mutation-types';

const state = {
  loading: {
    show: false
  }
};

const mutations = {
  [types.SHOW_LOADING](State) {
    State.loading.show = true;
  },

  [types.HIDE_LOADING](State) {
    State.loading.show = false;
  }
};

export {
  state,
  mutations
};
