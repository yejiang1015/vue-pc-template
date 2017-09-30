/**
 * @file 登录接口请求
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */

import axios from '../axios';

export default {
  /**
   * “登录”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  login(data) {
    return axios.post('operation/login', data);
  },
  /**
   * “登录状态校验”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  checkLogin(data) {
    return axios.get('operation/checklogin', data);
  },
  /**
   * “发送验证码”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  sendsms(data) {
    return axios.post('operation/sendVerifyCode', data);
  }
};
