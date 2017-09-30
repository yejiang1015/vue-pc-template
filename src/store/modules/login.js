/**
 * @file login模块
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */

import cookieUtil from 'util/cookie';
import actionCallback from 'util/action-util';
import login from '../../api/login';
import * as types from '../mutation-types';

const state = {
  token: cookieUtil.getCookie('token') || '',
  account: cookieUtil.getCookie('account') || ''
};

const getters = {
  token: State => State.token,
  account: State => State.account
};

const actions = {
  /**
   * 登录方法
   *
   * @param {any} { commit }
   * @param {any} options
   */
  async login({ commit }, options) {
    const result = await login.login(options.data);
    actionCallback(options, result);
    if (result && result.data && result.data.data) {
      commit(types.LOGIN, Object.assign(result.data.data, {
        account: options.data.user
      }));
    }
  },
  /**
   * 检验登录方法
   *
   * @param {any} { commit }
   * @param {any} options
   */
  async checkLogin({}, options) {
    const result = await login.checkLogin(options.data);
    actionCallback(options, result);
  },
  /**
   * 获取短信验证码方法
   *
   * @param {any} { commit }
   * @param {any} options
   */
  async sendsms({}, options) {
    const result = await login.sendsms(options.data);
    actionCallback(options, result);
  }
};

const mutations = {
  [types.LOGIN](State, data) {
    State.token = data.token;
    State.account = data.account;
    cookieUtil.setCookie('token', data.token);
    cookieUtil.setCookie('account', data.account);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
