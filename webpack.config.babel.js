var path = require('path');
var webpack = require('webpack');
var cssnano = require('cssnano');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/js/elections');
var production = process.env.NODE_ENV === 'production';
require('babel-register');

var pkg = require('./package.json');
var copyrights = `
   ${pkg.name} - ${pkg.description}
   @author: ${pkg.author}
   @version: ${pkg.version}
   @repository: ${pkg.repository.url}
   @license(s): ${pkg.license}
`;

var plugins = [
    new ExtractTextPlugin({filename: 'css/[name]-[hash].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main',
        children:  true,
        minChunks: 2,
    }),
    new HtmlWebpackPlugin({
        filename: '../elections.html',
        hash: false,
        template: 'src/assets/templates/elections-template.html'
    }),
    new webpack.LoaderOptionsPlugin({
       options: {
         eslint: {
           failOnWarning: false,
           failOnError: true,
         },
       },
     }),
    new webpack.BannerPlugin(copyrights)
];

if (production) {
    plugins = plugins.concat([
        new CleanPlugin('dist'), //equivalent of rm -r ./dist
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: cssnano,
          //cssProcessorOptions: options,
          canPrint: false,
          options: {
            discardComments: {
              removeAll: true,
            },
            safe: true,
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
            },
            output: {
              //comments: false
            },
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          jquery: 'jquery',
          Mustache: 'mustache'
        }),
        new webpack.DefinePlugin({
            __SERVER__:      !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__:    !production,
            'process.env':   {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]);
}

var config = {
    devtool: production ? false : 'eval',
    entry:  APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        chunkFilename: '[name]-[chunkhash].bundle.js',
        filename: production ? 'js/[name]-[hash].js' : 'js/bundle.js',
        publicPath: 'dist/',
	library: "ElectionsCarousel",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    devServer: {
        hot: true,
    },
    plugins: plugins,
    module: {
            rules: [
                {
                    test:   /\.jsx?$/, //matches .js AND .jsx files
                    include: APP_DIR,
                    exclude: /node_modules/,
                    use: [
                      {
                        loader: 'babel-loader',
                        query: {
                          babelrc: true,
                          plugins: ['transform-class-properties'],
                          presets: [
                              ['react'],
                          ],
                        }
                      },
                      {
                        loader: 'eslint-loader',
                      }
                    ]
                },
                {
                    test:   /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                      fallback: {loader: 'style-loader'},
                      use: [
                        {
                          loader: 'css-loader',
                          query: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:6]'
                          }
                        },
                        {
                          loader: 'sass-loader',
                        }
                      ]
                    })
                },
                {
                    test:   /\.html/,
                    use: [
                      {
                        loader: 'html-loader',
                      }
                    ]
                },
                {
                    test:   /\.(png|gif|jpe?g|svg)$/i,
                    use: [
                      {
                        loader: 'url-loader',
                        query: {
                          limit: 10000,
                        }
                      }
                    ]
                }
            ],
        }
};

module.exports = config;
