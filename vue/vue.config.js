const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const { isProduction } = require('./build/env')

module.exports = defineConfig({
    publicPath: isProduction ? '/wp-content/themes/casheer/dist' : '/',
    outputDir: path.resolve(__dirname, '../dist'),
    configureWebpack: {
        experiments: {
            topLevelAwait: true, // for can use async await in router
        },
        devServer: {
            // for CORS
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
            /* proxy: {
                '**': {
                    target: {
                        host: "0.0.0.0",
                        protocol: 'http:',
                        port: 8080
                    },
                    pathRewrite: {
                        '^/dist': ''
                    }
                }
             } */
        },
    },
})
