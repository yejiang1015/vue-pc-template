/**
 * @file ajax请求函数
 *
 * @Author: haiyangJ
 * @Date: 2017-3-1 16:27:42
 *
 *
 * 说明：
 * 后台restful请求方法机制为，
 * 请求正常 status状态码为200则不返回X-cmu-core-error和X-cmu-core-params头信息
 * 请求异常，状态码不为200,响应头中包含X-cmu-core-error和X-cmu-core-params头信息两个字段，通过xhr.getResponseHeader获取
 * 并且所有异常状态都通过resolve处理，不经过reject回调函数
 *
 * 针对上面两种情况前端再做一层封装，返回数据格式如下：
 {
   code: '',  // 状态码
   msg: '',   // 请求msg
   result: {    // 数据封装到该对象中返回
     ...
   }
 }
 *
 * 本地封装的两种code含义如下：
 * code=666666  请求成功
 * code=666667  请求超时，请重新请求~
 * code=666668  请求失败(failed/401等状态)
 */

export default function ajax ({
  type = 'get',
  timeout = 10000,
  data = {},
  dataType = 'json',
  url = '/',
  beforeSend = null
} = {}) {
  let selfType = type;
  let selfUrl = url;
  function genData (selfData) {
    if (typeof selfData === 'object' && selfData !== null) {
      const d = [];
      Object.entries(selfData).forEach((obj) => {
        d.push(`${encodeURIComponent(obj[0])}=${encodeURIComponent(obj[1])}`);
      });
      return d.join('&');
    }
    return selfData;
  }
  return new Promise((resolve) => {
    const xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 1) {
        if (beforeSend) {
          beforeSend();
        }
      }
      const ptr = window.setTimeout(() => {
        if (xhr.readyState !== 4) {
          // 超时
          resolve({
            code: '666667',
            msg: '请求超时，请重新请求~'
          });
          xhr.abort();
        }
      }, timeout);
      if (xhr.readyState === 4) {
        window.clearTimeout(ptr);
        const errorCode = xhr.getResponseHeader('X-cmu-core-error');
        const errorMsg = xhr.getResponseHeader('X-cmu-core-params');
        // console.log(errorCode, errorMsg);
        // console.log(xhr.status);
        let resultData = '';
        try {
          resultData = JSON.parse(xhr.responseText || {});
        } catch (e) {
          console.log(e);
          resultData = xhr.responseText;
        }
        if (xhr.status === 200) {
          resolve({
            code: errorCode || '666666',
            msg: errorMsg ? decodeURIComponent(errorMsg) : 'ok',
            result: resultData
          });
        } else {
          resolve({
            code: errorCode || '666668',
            msg: errorMsg ? decodeURIComponent(errorMsg) : process.env.ERROR_MSG
          });
        }
      }
    };
    selfType = selfType.toUpperCase();
    let localData = genData(data);
    if (selfType === 'GET') {
      selfUrl = selfUrl + (selfUrl.indexOf('?') > 0 ? '&' : '?') + localData;
      localData = null;
    }
    xhr.open(selfType, selfUrl, true);
    xhr.withCredentials = true;
    // xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://dev.paic.com.cn:3000');
    if (selfType !== 'GET') {
      if (dataType === 'json') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    }
    xhr.send(localData);
  });
}
