const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取入口文件的配置对象
function getEntryConfigObj() {
  const entryDirPath = path.resolve(__dirname) + '/entry';
  const files = fs.readdirSync(entryDirPath);
  let entryObj = {};
  files.forEach(item => {
    entryObj[item.replace(/\.js/, '')] = entryDirPath + '/' + item;
  });
  return entryObj;
}

// 获取静态html模板数组
function getStaticHtmlConfigArr() {
  const staticHtmlDirPath = path.resolve(__dirname) + '/publick';
  const files = fs.readdirSync(staticHtmlDirPath) || [];
  let fileNames = [];
  files.forEach(item => {
    fileNames.push(item.replace(/\.html/, ''));
  });
  return fileNames;
}

// 生成htmlPlugins
function genrateHtmlPlugins() {
  const fileNames = getStaticHtmlConfigArr();
  const htmlWebpackPlugins = fileNames.map(item =>
    new HtmlWebpackPlugin({
      title: '',
      filename: 'html/' + item + '.html',
      template: './publick/' + item + '.html',
      chunks: [item],
      hash: true,
    }));
  return htmlWebpackPlugins;
}

function commonConfig(param) {
  return {
    mode: param.mode || "development", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: getEntryConfigObj() || "./src", // string | object | array
    // 默认为 ./src
    // 这里应用程序开始执行
    // webpack 开始打包
    output: {
      // webpack 如何输出结果的相关选项
      path: path.resolve(__dirname, "dist"), // string (default)
      // 所有输出文件的目标路径
      // 必须是绝对路径（使用 Node.js 的 path 模块）
      filename: "scripts/[name].chart.[hash].js", // string (default)
      // entry chunk 的文件名模板
      publicPath: "./", // string
      // 输出解析文件的目录，url 相对于 HTML 页面
    },
    //  loader配置
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // {
        //   test: /\.less$/i,
        //   loader: [
        //     // compiles Less to CSS
        //     'style-loader',
        //     'css-loader',
        //     'less-loader',
        //   ],
        // },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [new CleanWebpackPlugin()].concat(genrateHtmlPlugins()),

    // resolve: {
    //   // options for resolving module requests
    //   // (does not apply to resolving of loaders)
    //   modules: ["node_modules",path.resolve(__dirname, "app")],
    //   // directories where to look for modules (in order)
    //   extensions: [".js", ".json", ".jsx", ".css"],
    //   // 使用的扩展名
    //   alias: {
    //     // a list of module name aliases
    //     // aliases are imported relative to the current context
    //     "module": "new-module",
    //     // 别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
    //     "only-module$": "new-module",
    //     // 别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
    //     "module": path.resolve(__dirname, "app/third/module.js"),
    //     // alias "module" -> "./app/third/module.js" and "module/file" results in error
    //     "module": path.resolve(__dirname, "app/third"),
    //     // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
    //     [path.resolve(__dirname, "app/module.js")]: path.resolve(__dirname, "app/alternative-module.js"),
    //     // alias "./app/module.js" -> "./app/alternative-module.js"
    //   },
    //   /* 可供选择的别名语法（点击展示） */
    //   /* 高级解析选项（点击展示） */
    //   /* Expert resolve configuration (click to show) */
    // },
    // performance: {
    //   hints: "warning", // 枚举
    //   maxAssetSize: 200000, // 整数类型（以字节为单位）
    //   maxEntrypointSize: 400000, // 整数类型（以字节为单位）
    //   assetFilter: function(assetFilename) {
    //     // 提供资源文件名的断言函数
    //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    //   }
    // },
    devtool: param.devtool, // enum
    devServer: {
      proxy: { // proxy URLs to backend development server
        '/api': 'http://localhost:3000'
      },
      static: path.join(__dirname, 'public'), // boolean | string | array, static file location
      compress: true, // enable gzip compression
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
      noInfo: true, // only errors & warns on hot reload
      // ...
    },
  }

}

module.exports = commonConfig;