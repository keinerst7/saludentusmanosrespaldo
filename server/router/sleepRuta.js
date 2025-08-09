const express = require('express');
const router = express.Router();
const SleepController = require('../controlador/sleepController');

router.get('/', SleepController.getAll);
router.get('/:id', SleepController.getById);
router.post('/', SleepController.create);
router.put('/:id', SleepController.update);
router.delete('/:id', SleepController.delete);

module.exports = router;