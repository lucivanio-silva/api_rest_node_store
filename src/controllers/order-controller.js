'use strict';

const repository = require('../repositories/order-repository');
//cria uma cadeia de numeros aleatorias não repetidas
const guid = require('guid');
const authService = require('../services/auth-service');

//lista todos as ordens
exports.get = async(req, res, next) => {
    try {
        //aguarda execução do repository
        var data = await repository.get()
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

//salva ordem
exports.post = async(req, res, next) => {

    try {

        // recupera token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        const data = await authService.decodeToken(token);

        await repository.create({
            customer: data._id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(200).send({
            message: "Ordem cadastrada com sucesso"
        });
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

exports.put = async(req, res, next) => {
    try {
        //busca o cliente pelo id e já atualiza o mesmo
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Cliente alterado com sucesso"
        });
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

//deleta cliente
exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: "cliente excluido com sucesso"
        })
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}