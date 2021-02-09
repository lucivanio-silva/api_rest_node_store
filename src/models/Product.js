'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    title: {
        type: String,
        required: true,
        //remove espaços em branco no inicio e no fim da string
        trim: true
    },
    slug: {
        type: String,
        //dá pra colocar uma mensagem nos campos required para exibir se ele não for preenchido
        // required: [true, 'o slug é obrigatório'],
        required: true ,
        trim: true,
        //para ajudar nas buscas
        index: true,
        //o campo não pode se repetir ele é unico
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('products', Product);