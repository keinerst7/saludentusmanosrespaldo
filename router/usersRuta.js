const express = require('express');
const router = express.Router();
const usersControlador = require('../controlador/usersControlador');

router.get('/', usersControlador.listar);
router.get('/:id', usersControlador.obtener);
router.post('/', usersControlador.crear);
router.put('/:id', usersControlador.actualizar);
router.delete('/:id', usersControlador.eliminar);

module.exports = router;