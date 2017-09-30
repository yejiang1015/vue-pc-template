/**
 * @file vue-router路由配置文件
 *
 * @Author: hiayangJ
 * @Date: 2017-04-17 17:05:42
 */

import Vue from 'vue';
import Router from 'vue-router';
import cookieUtil from 'util/cookie';

Vue.use(Router);

const router = new Router({
  // mode: 'history',

  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: r => require(['views/login'], r)
    },
    {
      path: '/main',
      component: r => require(['views/main'], r)
      // children: [
      //   {
      //     path: '/',
      //     redirect: ''
      //   }
      // ]
    }
  ]
});

/**
 * 全局钩子
 *
 * @param {Object} to 目标路由
 * @param {Object} from 当前路由
 * @param {Function} from 回调函数
 */
router.beforeEach((to, from, next) => {
  // 判断是否登录，未登录跳转登录页
  if (!cookieUtil.getCookie('token') && to.path.indexOf('main') !== -1 && from.path.indexOf('login') === -1) {
    cookieUtil.delCookie('token');
    cookieUtil.delCookie('account');
    router.replace({
      path: '/login',
      query: {
        link: window.encodeURIComponent(to.fullPath)
      }
    });
  }
  next();
});

export default router;
