const express = require('express');
const router = express.Router();
const moodController = require('../controlador/moodController');

router.get('/:userId', moodController.obtenerTodos);
router.get('/entry/:id', moodController.obtenerPorId);
router.post('/', moodController.crear);
router.put('/:id', moodController.actualizar);
router.delete('/:id', moodController.eliminar);

module.exports = router;