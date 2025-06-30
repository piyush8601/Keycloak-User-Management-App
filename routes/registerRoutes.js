const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController.js')

router.get('/register', registerController.showRegisterForm);
router.post('/register', registerController.handleRegister);
router.get('/', (req, res) => res.redirect('/register'));
router.get('/error', registerController.showErrorPage);

module.exports = router;
