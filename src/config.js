//uma chave secreta que criamos dentro do sistema para geração de tokens
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
//template de email simples (global é uma variavel global)
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';

module.exports = {
    connectionString: 'mongodb+srv://lucivanio:65626198@cluster0.tg018.mongodb.net/store?retryWrites=true&w=majority',
    //para enviar e-mails
    sendgridKey: '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',
    //para subir imagens no azure
    containerConnectionString: 'TBD'
}