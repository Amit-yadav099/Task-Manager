const express = require('express');
const router = express.Router();

const { register, login } = require('../Controllers/AuthController');

router.post('/register', register); // to register

router.post('/login', login); // to login

module.exports = router;