/**
 * @file reg正则列表
 *
 * @Author: hiayangJ
 * @Date: 2017-04-17 17:05:42
 */

const rules = {

  // 用户名,姓名拼音+3位数字编号
  login_account: {
    reg: /^\w{1,}$/,
    msg: '用户名格式错误',
  },

  // 密码
  login_password: {
    reg: /^.{1,16}$/,
    msg: '密码格式错误',
  },

  // 手机
  mobile: {
    reg: /^1[34578]\d{9}$/,
    msg: '手机号码不正确',
  },
};



export default function valid(name, val) {
  const rule = rules[name];
  return rule.reg.test(val) ? '' : rule.msg;
}
