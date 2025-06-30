const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

router.get('/login', loginController.showLoginForm);
router.post('/login', loginController.handleLogin);
router.get('/error', loginController.showErrorPage);

module.exports = router;
