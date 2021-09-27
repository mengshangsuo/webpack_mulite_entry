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
  const staticHtmlDirPath = path.resolve(__dirname) + '/staticHtml';
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
      template: './staticHtml/' + item + '.html',
      chunks: [item],
      hash: true,
    }));
  return htmlWebpackPlugins;
}

module.exports = function(env, argv) {

  return {
    mode: 'development',
    entry: getEntryConfigObj(),
    output: {
      // webpack 如何输出结果的相关选项
      path: path.resolve(__dirname, "dist"), // string (default)
      // 所有输出文件的目标路径
      // 必须是绝对路径（使用 Node.js 的 path 模块）
      filename: "scripts/[name].chart.[hash].js", // string (default)
      // entry chunk 的文件名模板
      // publicPath: "/", // string
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
    // 插件配置
    plugins: [new CleanWebpackPlugin()].concat(genrateHtmlPlugins()),
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
        publicPath: "/",
        serveIndex: true,
        watch: true,
      },
      allowedHosts: 'auto',
      hot: true,
      port: 9999,
    },
  }
}