/**
 * @file 获取当前环境信息
 *
 * @Author: haiyangJ
 * @Date: 2017-04-17 17:05:42
 */

export default function getEnv () {
  const url = window.location.host;
  // 默认外网
  let baseURL = 'http://120.78.234.124:2008/';

  if (/^(operation.platform.kimed.me|localhost|192)/.test(url)) {
    // 内网
    baseURL = 'http://39.108.178.7:2008/';
  }
  return baseURL;
}
