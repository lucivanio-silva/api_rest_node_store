'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: {
        type: String,
        required: true,
        //remove espaços em branco no inicio e no fim da string
        trim: true
    },
    email: {
        type: String,
        required: true,
        //remove espaços em branco no inicio e no fim da string
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
    
});

module.exports = mongoose.model('customers', Customer);