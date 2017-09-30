/**
 * Created by haiyangJ on 2017/1/17.
 * mock数据
 */
const glob = require('glob');

module.exports = function (app) {
  glob('./mock/!(index).js', (err, files) => {
    files.forEach((item) => {
      require('.' + item).apis.forEach((sub) => {
        app.all(sub.url, (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', req.get('origin'));
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          res.setHeader('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,POST,PUT,OPTIONS,TRACE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header,accept, Content-Type');
          res.setHeader('Content-Type', 'application/json;charset=UTF-8');
          res.status(200).send(sub.data);
        });
      });
    });
  });
};
