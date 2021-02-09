'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('products');

 //função agora é assyncrona
exports.get = async() => {
   //aguarda a execução do product.find
    const res = await Product
        .find({
            active: true /*traz somente produtos ativos*/
        },'title price slug' /*campos da collection a serem listados*/);
    //depois de finalizada a execução retorna o resultado
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    },'title description price slug tags');
    return res;
}

exports.getByTag = async(tag) => {
    const res =  await Product.find({
        //vc só precisa passar o valor o mongoose procura sozinho no array
        tags: tag,
        active: true
    },'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
}

exports.create = async(data) => {
    let product = new Product(data);
    const res = await product.save();
    return res;
}

exports.update = async(id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        //no '$set' colocamos todos os dados que vão ser alterados
        $set:{
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
    return res;
}

exports.delete = async(id) => {
    const res = await Product.findByIdAndRemove(id);
    return res;
}