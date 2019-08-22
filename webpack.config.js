module.exports = {
    entry: ['@babel/polyfill','./src/main.js'], //local do arquivo principal e qual arquivo
    output: { //pra qual arquivo vai enviar como babel faz
        path: __dirname + '/public', //__dirname se refere ao diretorio do arquivo webpack.config.js
        filename: 'bundle.js', 
    },
    devServer:{
      contentBase: __dirname + '/public', //Onde o servidor redicionará
    },
    module: {
        rules: [ //como webpack se comporta quando importar outros arquivos js
            {
              test: /\.js$/,  //toda vez que importar um novo js, o babel executará sozinho no arquivo
              exclude: /node_modules/, //para não pegar os js da pasta node_modules
              use: {
                loader: 'babel-loader', //loader que fará tudo isso
              }
            }
        ],
    },
};