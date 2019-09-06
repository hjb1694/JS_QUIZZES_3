const path = require('path');

module.exports = {
    entry : {
        'register' : './webpack-src/register.js', 
        'quiz' : './webpack-src/quiz.js', 
        'login' : './webpack-src/login.js'
    }, 
    output : {
        filename : '[name].bundle.js',
        path : path.resolve(__dirname, 'public', 'js')
    }, 
    mode : 'development', 
    watch : true, 
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}