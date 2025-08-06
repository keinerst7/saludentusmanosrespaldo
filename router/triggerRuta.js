const express = require('express');
const router = express.Router();
const triggerController = require('../controlador/triggerController');

router.get('/mood/:mood_entry_id', triggerController.obtenerTodos); // Triggers por entrada
router.get('/:id', triggerController.obtenerPorId);
router.post('/', triggerController.crear);
router.put('/:id', triggerController.actualizar);
router.delete('/:id', triggerController.eliminar);

module.exports = router;