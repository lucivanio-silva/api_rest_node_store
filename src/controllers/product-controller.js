'use strict';

//usando o arquivo fluid-validator
const ValidationContract = require('../validators/fluent-validator');
//usando o repositorio de abstração de acesso ao banco
const repository = require('../repositories/product-repository');

//lista todos os produtos
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

//busca produto pela slug
exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
   
}

//busca produto por tag
exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

//busca produto por id
exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

//salva produtos
exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descição deve conter no mínimo 3 caracteres');

    //Se os dados não forem válidos retorna os erros e finaliza a requisição
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        //o return é pra ele ignorar o resto da função
        return;
    }

    try {
        await repository.create(req.body);
        res.status(200).send({
            message: "Produto inserido com sucesso"
        });
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

//atualiza produto
exports.put = async(req, res, next) => {
    try {
        //busca o produto pelo id e já atualiza o mesmo
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Produto alterado com sucesso"
        });
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

//deleta produto
exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: "produto excluido com sucesso"
        })
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}