const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);  
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUserById);       // Rota para obter um único usuário
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

module.exports = router;