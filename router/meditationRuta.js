const express = require('express');
const router = express.Router();
const meditationController = require('../controlador/meditationController');

router.get('/', meditationController.getAll);
router.get('/:id', meditationController.getById);
router.post('/', meditationController.create);
router.put('/:id', meditationController.update);
router.delete('/:id', meditationController.delete);

module.exports = router;