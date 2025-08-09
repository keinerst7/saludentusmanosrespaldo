const express = require('express');
const router = express.Router();
const CompletedMeditationsController = require('../controlador/completedMeditationsController');

router.get('/', CompletedMeditationsController.getAll);
router.get('/:id', CompletedMeditationsController.getById);
router.post('/', CompletedMeditationsController.create);
router.put('/:id', CompletedMeditationsController.update);
router.delete('/:id', CompletedMeditationsController.delete);

module.exports = router;