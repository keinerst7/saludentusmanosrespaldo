const express = require('express');
const router = express.Router();
const UserController = require('../controlador/usersController');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/login', UserController.login);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;