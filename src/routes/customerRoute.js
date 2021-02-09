'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
//importando serviço de token
const authService = require('../services/auth-service');

router.get('/', controller.get)
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;