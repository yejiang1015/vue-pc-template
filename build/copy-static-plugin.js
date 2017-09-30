/**
 * Created by haiyangJ on 2017/2/9.
 * 拷贝static下资源
 */
require('shelljs/global');

function CopyStaticFilePlugin(options) {
  this.options = options;
}

CopyStaticFilePlugin.prototype.apply = function(compiler) {
  const copyPath = this.options.src;
  const assetsPath = this.options.dist;
  compiler.plugin('done', function() {
    mkdir('-p', assetsPath);
    cp('-R', copyPath, assetsPath);
  });
};

module.exports = CopyStaticFilePlugin;