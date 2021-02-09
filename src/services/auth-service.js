//serviço de autenticação

'use strict';
const jwt = require('jsonwebtoken');

//data = dados que queremos inputar dentro do token (nesse caso o email e os holes)
exports.generateToken = async (data) => {
    //gera o token assinado
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

//decodifica as informações do token
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

//serve como interceptador, todas as rotas que quisermos bloquear o acesso ao usuario por token
//ele recebe o request e busca o token
exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

//verifica se o usuário é admin
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};