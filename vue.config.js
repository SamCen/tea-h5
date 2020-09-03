const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                REDIRECT_URL: JSON.stringify(process.env.VUE_REDIRECT_URI),
            })
        ]
    }
}
