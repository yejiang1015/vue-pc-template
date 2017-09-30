/**
 * @file order模块
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */

import actionCallback from 'util/action-util';
import order from '../../api/order';
import * as types from '../mutation-types';

const state = {};

const getters = {};

const actions = {
  /**
   * 获取医院数据
   *
   * @param {any} options
   */
  async getHospitalList({}, options) {
    const result = await order.getHospitalList(options.data);
    actionCallback(options, result);
  },
  /**
   * 获取“保险产品列表”数据
   *
   * @param {any} options
   */
  async getInsuranceProductSysList({}, options) {
    const result = await order.getInsuranceProductSysList(options.data);
    actionCallback(options, result);
  },
  /**
   * 获取“订单查询”数据
   *
   * @param {any} options
   */
  async getOrderList({}, options) {
    const result = await order.getOrderList(options.data);
    actionCallback(options, result);
  },
  /**
   * 获取“订单详细信息”
   *
   * @param {any} options
   */
  async getOrderdetail({}, options) {
    const result = await order.getOrderdetail(options.data);
    actionCallback(options, result);
  },
  /**
   * 获取“订单统计”数据
   *
   * @param {any} options
   */
  async getOrderStatisticsList({}, options) {
    const result = await order.getOrderStatisticsList(options.data);
    actionCallback(options, result);
  }
};

const mutations = {
  [types.LOGIN](State, data) {
    State.token = data.token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
