const express = require('express');

const router = express.Router();

const emailController = require('../controlador/EmailController');

router.post('/enviar', emailController.controladorEnviarCorreo);

module.exports = router; 