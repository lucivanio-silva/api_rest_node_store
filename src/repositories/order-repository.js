'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('orders');

 //função agora é assyncrona
exports.get = async() => {
   //aguarda a execução do Customer.find
    const res = await Order
                    //populate preenche as informações de um campo
                    //referenciado com id 
        .find({}, 'number status')
        .populate('customer', 'name') //com populate também podemos pear campos especificos
        .populate('items.product', 'title' );
    //depois de finalizada a execução retorna o resultado
    return res;
}

exports.create = async(data) => {
    let order = new Order(data);
    const res = await order.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Order.findByIdAndUpdate(id, {
        //no '$set' colocamos todos os dados que vão ser alterados
        $set:{
            custumer: data.custumer,
            number: data.number,
            status: data.status,
            items: data.items
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Order.findByIdAndRemove(id);
    return res;
}