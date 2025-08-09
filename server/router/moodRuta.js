const express = require('express');
const router = express.Router();
const MoodController = require('../controlador/moodController');

router.get('/', MoodController.getAll);
router.get('/:id', MoodController.getById);
router.post('/', MoodController.create);
router.put('/:id', MoodController.update);
router.delete('/:id', MoodController.delete);

module.exports = router;