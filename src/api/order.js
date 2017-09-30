/**
 * @file 登录接口请求
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */

import axios from '../axios';

export default {
  /**
   * “获取医院列表”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  getHospitalList(data) {
    return axios.get('operation/relatedhospital', {
      params: data
    });
  },
  /**
  * “保险产品列表”接口
  *
  * @param {any} data 请求数据
  * @returns 后台返回的数据
  */
  getInsuranceProductSysList(data) {
    return axios.get('operation/insuranceproducts', {
      params: data
    });
  },
  /**
   * “订单查询”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  getOrderList(data) {
    return axios.post('operation/queryorder', data);
  },
  /**
   * “订单详细信息查询”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  getOrderdetail(data) {
    return axios.post('operation/orderdetail', data);
  },
  /**
   * “订单统计”接口
   *
   * @param {any} data 请求数据
   * @returns 后台返回的数据
   */
  getOrderStatisticsList(data) {
    return axios.post('operation/stats/stats', data);
  }
};
