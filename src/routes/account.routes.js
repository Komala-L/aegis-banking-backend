const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const accountController = require('../controllers/account.controller');

const router = express.Router();

/**
 * Create a new account
 * @route POST /
 * @access Private
 */
router.post('/', authMiddleware.authMiddleware, accountController.createAccountController);

module.exports = router;