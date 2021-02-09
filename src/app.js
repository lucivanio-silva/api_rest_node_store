'use strict'

const express = require('express');
//converte as requições (corpo) para JSON
const bodyParser = require('body-parser');
//mongoose
const mongoose = require('mongoose');
//arquivo de configuração
const config = require('./config');

const app = express();
const router = express.Router();

//conecta com o banco de dados
//aqui vem a string de conexão do site
mongoose.connect( config.connectionString,
{
    //para não exibir erro de topologia antiga
    useUnifiedTopology: true,
    //usa versao atualizada do index
    useCreateIndex: true, 
    useFindAndModify: false,
    useNewUrlParser: true}).then(()=>{
        console.log('mongoDB conectado')
    }).catch((err) =>{
        console.log('erro ao conectar: '+ err)
});

// Carrega os Models
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

//carrega rotas
const indexRoute = require('./routes/indexRoute');
const productRoute = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const orderRoute = require('./routes/orderRoute');

//dizendo para o app usar o body-parser
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

//Habilita o CORS
app.use((req, res, next)=>{
    //urls quem tem acesso a API, no caso está setado como todas (*), por padrão conexões como localhost são bloqueadas
    res.header('Access-Control-Allow-Origin', '*');
    //aqui vem também o nome do nosso cabeçalho de token                                            v
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    //metodos HTTP utilizados
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

//exportando o app
module.exports = app;