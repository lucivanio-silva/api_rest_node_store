//serviço para envio de e-mails
'use strict'

var config = require('../config');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sgMail.send({
        to: to,
        from: 'lucivanio.ins@gmail.com',
        subject: subject,
        html: body
    })
    .then(()=>{
        console.log('message send');
    })
    .catch((error) => {
        console.log(error.response.body);
    });
}