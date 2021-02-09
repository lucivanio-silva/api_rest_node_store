'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
//para encriptar senhas
const md5 = require('md5');
//importando serviço de token
const authService = require('../services/auth-service');

//importando o serviço de email
const emailService = require('../services/email-service');

//lista todos os clientes
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

//salva clientes
exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter no mínimo 3 caracteres');
    contract.isEmail(req.body.email, 3, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter no mínimo 6 caracteres');

    //Se os dados não forem válidos retorna os erros e finaliza a requisição
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        //o return é pra ele ignorar o resto da função
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:["user"]
        });

        //enviando email de boas vindas
        emailService.send(req.body.email,
            'Bem ao Node Store',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        );

        res.status(201).send({
            message: "Cliente cadastrado com sucesso"
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

exports.authenticate = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 3, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter no mínimo 6 caracteres');

    //Se os dados não forem válidos retorna os erros e finaliza a requisição
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        //o return é pra ele ignorar o resto da função
        return;
    }

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        //se não existir customer
        if(!customer){
            res.status(404).send({
                message: 'usuário ou senha inválidos'
            });
            return;
        }

        //criando token para o usuário
                    //aguarda a geração do token
        const token = await authService.generateToken({
            //dados salvos no token
            id: customer.id,
            email: customer.email,
            name: customer.name,
            //permissões do usuário
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        });
    } catch(e) {
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}

exports.refreshToken = async(req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        })
    } catch (e){
        res.status(500).send({
            message: "Falha ao processar requisição",
            data: e
        });
    }
}