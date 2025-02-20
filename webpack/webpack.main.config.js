const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
    mode: 'development',
    target: 'electron-main',
    entry: {
        main: './src/main/index.ts'
    }
});
