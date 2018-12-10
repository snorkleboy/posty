const productionMode = (process.argv[3] === "production")

var path = require('path');
var webpack = require("webpack");
require("./frontend/Feature/webpackUtils/syncFeatureHelper")();
const CleanWebpackPlugin = require('clean-webpack-plugin');



var plugins = [
    CleanWebpackPlugin
];
var devPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }),
];

var prodPlugins = [
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

plugins = plugins.concat(
    productionMode? prodPlugins : devPlugins
);


const rules = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            cacheDirectory: false,
            presets: ['es2015', 'react', "stage-0", 'stage-2']
        }
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            "style-loader",
            'css-loader',
            'sass-loader',
        ],
    }
]

const moduleObj = {rules}
const devtool = productionMode? "none" : 'cheap-module-eval-source-map'
const resolve = {
    extensions: ['.js', '.jsx','.scss'],
    alias: {
        app:path.resolve(__dirname, './app'),
        baseApp: path.resolve(__dirname, './frontend/baseApp/'),
        baseStyles: path.resolve(__dirname, './frontend/baseApp/styles'),
        baseRedux: path.resolve(__dirname, './frontend/baseApp/store'),
        features: path.resolve(__dirname, './frontend/features'),
        Feature:path.resolve(__dirname,'./frontend/Feature/Feature.js'),
        featureLoader:path.resolve(__dirname,'./frontend/Feature/featureProvider/featureLoader'),
        UILibrary: path.resolve(__dirname, './frontend/UILibrary/'),
        util: path.resolve(__dirname, './frontend/util/'),
        frontend: path.resolve(__dirname, './frontend/'),
    }
};

const entryOptions = {
    mode: productionMode ? "production" : "development",
    entry: {
        WeatherModuleEntry:'./frontend/entry.jsx',
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/webpackOutput/',
        path: path.resolve(__dirname, 'public/webpackOutput'),
        chunkFilename: '[name].chunk.js',
    },
    plugins,
    resolve,
    devtool,
    module:moduleObj,
    watchOptions: {
        poll: true
    }
}

console.log({
    productionMode,
    entryOptions,
    plugins
})
module.exports = [entryOptions];