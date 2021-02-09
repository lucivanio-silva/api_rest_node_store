const app = require('../src/app');
const debug = require('debug')('balta:server');
const http = require('http');

//busca uma porta disponivel onde o app está rodando ou tenta a porta 3000
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

//criando o servidor
const server = http.createServer(app);

//diz para o servidor ficar ouvindo a porta definida
server.listen(port);
//faz a verificação de erros
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta: '+port);

function normalizePort(val) {
    //tentando converter o valor para um inteiro
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    //caso não for nenhum dos dois retorna falso
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind +' is already in use');
            process.exit(1);
            break;
        default :
            throw error;
    }
}

//pega as informações do servidor e starta o debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}