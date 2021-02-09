'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        //nome da collection de referencia
        ref: 'customers'
    },
    number: {
        type: String,
        required: true,
        //remove espaços em branco no inicio e no fim da string
        trim: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            required:true,
            default: 1
        },
        price: {
            type: Number,
            required: true,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
});

module.exports = mongoose.model('orders', Order);