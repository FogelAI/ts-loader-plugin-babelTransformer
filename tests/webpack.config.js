const createBabelPluginWrapper = require('../dist/main').default;
const babelPluginTransformBarrels = require('babel-plugin-transform-barrels');
const babelPlugins = [
    [babelPluginTransformBarrels, {
        executorName: "webpack", logging: { type: "file" }
    }]
];

module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    path: require("path").resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              createBabelPluginWrapper({
                babelPlugins: babelPlugins,
                babelOptions: {
                  // Additional Babel options if needed
                }
              })
            ]
          })
        }
      }
    ]
  }
};