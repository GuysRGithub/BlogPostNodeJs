const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
    entry: [
        './app/bundles/HelloWorld/startup/registration',
    ],

    output: {
        filename: 'hello-world-bundle.js',
        path: '../app/assets/webpack'
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            assets: path.resolve('./app/assets'), // Makes it easier to reference our assets in jsx files
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv),
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: require.resolve('react'),
                use: {
                    loader: 'imports-loader',
                    options: {
                        shim: 'es5-shim/es5-shim',
                        sham: 'es5-shim/es5-sham',
                    },
                }
            },
            {
                // The important stuff
                test: /\.(jpg|jpeg|png)(\?.*)?$/, // Load only .jpg .jpeg, and .png files
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name][md5:hash].[ext]', // Name of bundled asset
                        outputPath: 'webpack-assets/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
                        publicPath: '/assets/webpack-assets/' // Endpoint asset can be found at on Rails server
                    }
                }
            }
        ]
    }
};