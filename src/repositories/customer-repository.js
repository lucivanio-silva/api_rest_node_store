'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('customers');

 //função agora é assyncrona
exports.get = async() => {
   //aguarda a execução do Customer.find
    const res = await Customer
        .find({});
    //depois de finalizada a execução retorna o resultado
    return res;
}

exports.create = async(data) => {
    let product = new Customer(data);
    const res = await product.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Customer.findByIdAndUpdate(id, {
        //no '$set' colocamos todos os dados que vão ser alterados
        $set:{
            nome: data.name,
            email: data.email,
            password: data.password
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Customer.findByIdAndRemove(id);
    return res;
}

//autentica o cliente via token
exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}