const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path)
};

exports.cssLoaders = function (options) {
  options = options || {};

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader];
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  const basicLoader = generateLoaders();
  basicLoader.push({
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
    }
  });
  return {
    css: basicLoader
  }
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  let output = [];
  let loaders = exports.cssLoaders(options);
  for (let extension in loaders) {
    let loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
};


/**
 * 各个模块下面的js/css/html文件不能使用相同的名字,页面中会引用所有模块的CSS和JS文件
 * 如现有架构中每个模块的main.js，需要重命令为模块的名字,例：
 * { 'module/classmates/classmates': './src/module/classmates/main.js',
  'module/login/login': './src/module/login/main.js' }
 * @param globPath
 * @return {{}}
 */
function getEntries(globPath) {
  let entries = {},
    basename,
    tmp,
    pathname;
  glob.sync(globPath).forEach((entry) => {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.slice(0, 2).join('/'); // 正确输出js路径
    entries[pathname] = entry;
  });
  return entries;
};

exports.getEntries = getEntries;

exports.getRewrites = function() {
  const pages = getEntries('./src/module/**/index.ejs');
  const rewrites = [];
  for (const page in pages) {
    const name = page.split('/').pop();
    rewrites.push({
      // 正则不能和page名完全相等，会导致打包出来的同名js文件内容为html的内容，从而使页面报错
      from: new RegExp(`^\/${name}`), to: `/${page}.html`
    });
  }
  return rewrites;
};


// exports.setHtmlOutputPlugin = function (pages) {
//   let htmlPlugins = [];
//   for (let pathname in pages) {
//     let arr = ['manifest', 'vendor', pathname];
//     htmlPlugins.push({
//       filename: pathname + '.html',   // 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
//       template: pages[pathname],      // 模板文件路径，支持加载器，比如 html!./index.html
//       inject: true,                   // true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，
//                                       // 如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
//       minify: {
//         removeComments: true,         // 带html注释
//         collapseWhitespace: true,
//         minifyJS: true,
//         minifyCSS: true,
//         // removeAttributeQuotes: true
//       },
//       hash: false,                     // 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用
//       chunks: arr,
//       chunksSortMode: 'dependency'
//     });
//   }
//   return htmlPlugins;
// };