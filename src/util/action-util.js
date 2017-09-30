/**
 * @file action 中处理请求的回调函数
 *
 * @Author: haiyangJ
 * @Date: 2017-07-25 10:27:42
 */

const actionCallback = (options, response) => {
  if (response.status === 200) {
    if (options.success) {
      options.success(response.data);
    }
    return;
  }
  if (options.error) {
    options.error(response);
  }
};

export default actionCallback;
