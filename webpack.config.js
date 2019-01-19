//@ts-check
import webpack from 'webpack'
import path from 'path'

// plugins
import copyPlugin from 'copy-webpack-plugin'

// -----------------------------------------------------------------------------

// variables
const sourcePath = path.join(__dirname, './src')
const outPath = path.join(__dirname, './dist/.dev')

export default {
  context: sourcePath,
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true&reload=true',
      'whatwg-fetch',
      'index.tsx',
    ],
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    mainFields: ['main'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader'],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      { test: /\.styl$/, use: ['style-loader', 'css-loader', 'stylus-loader'] },
      {
        test: [/\.scss/, /\.sass/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [sourcePath + '/styles'],
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new copyPlugin([{ from: 'assets', to: 'assets' }]),
  ],
}
