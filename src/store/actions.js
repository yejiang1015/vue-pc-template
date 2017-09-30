/**
 * @file common模块的actions
 *
 * @Author: haiyangJ
 * @Date: 2017-04-17 17:05:42
 */

import * as types from './mutation-types';

export const showLoading = ({ commit }) => {
  commit(types.SHOW_LOADING);
};

export const hideLoading = ({ commit }) => {
  commit(types.HIDE_LOADING);
};
