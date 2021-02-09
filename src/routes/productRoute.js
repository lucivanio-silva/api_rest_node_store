'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
//importando serviço de token
const authService = require('../services/auth-service');


router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
//se fosse ':/id iria dar conflito como get '/:slug', pois as rotas são as mesmas
router.get('/admin/:id', controller.getById);
//tags para não dar conflito das rotas
router.get('/tags/:tag', controller.getByTag);
//antes da rota vem o middware de token para verificar a autorização
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;