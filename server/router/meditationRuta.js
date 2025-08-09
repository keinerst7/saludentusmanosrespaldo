const express = require('express');
const router = express.Router();
const MeditationController = require('../controlador/meditationController');

router.get('/', MeditationController.getAll);
router.get('/:id', MeditationController.getById);

module.exports = router;