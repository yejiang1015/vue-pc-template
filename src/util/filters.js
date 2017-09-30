/**
 * @file 函数库
 *
 * @Author: haiyangJ
 * @Date: 2016-10-27 10:27:42
 */

/**
 * @file 主页
 *
 * @Author: haiyangJ
 * @Date: 2017-06-10 10:27:42
 */


/**
 * 根据路径获取二级导航的焦点
 * 
 * @param {any} name 导航的名字
 * @param {any} path 路径
 * @return {Boolean} 
 */
const isCurrentNavName = (name, path) => path.endsWith(name);

export default {
  isCurrentNavName
};
