/**
 * @file store插件，Logger
 *
 * @Author: haiyangJ
 * @Date: 2017-04-17 17:05:42
 */

const plugins = [];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('vuex/dist/logger');

  plugins.push(createLogger({
    collapsed: false
  }));
}

export default plugins;
