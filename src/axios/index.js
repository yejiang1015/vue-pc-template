/**
 * @file axios数据请求插件
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42 
 */

import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import cookieUtil from 'util/cookie';
import getEnv from 'util/getEnv';
import router from '../router';

Vue.use(iView);

// 创建axios实例
const instance = axios.create({
  baseURL: getEnv(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// request过滤器
instance.interceptors.request.use((config) => {
  config.headers['x-access-token'] = cookieUtil.getCookie('token') || '';
  iView.LoadingBar.start();
  return config;
}, (err) => {
  iView.LoadingBar.error();
  return Promise.reject(err);
});

// response过滤器
instance.interceptors.response.use((response) => {
  iView.LoadingBar.finish();
  // 未登录,显示登录弹窗，清除token
  if (response.data && response.data.retCode === 2000) {
    cookieUtil.delCookie('token');
    cookieUtil.delCookie('account');
    router.replace({
      path: '/login',
      query: {
        link: window.encodeURIComponent(window.location.hash)
      }
    });
  }
  return response;
}, (err) => {
  iView.LoadingBar.error();
  return Promise.reject(err);
});


// 返回axios实例
export default instance;
