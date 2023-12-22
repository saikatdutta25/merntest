const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authmiddleware');

router.post(
    '/register',
    [
        body('fullname', 'Fullname is required').notEmpty(),
        body('username', 'Username is required').notEmpty(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    authController.register
);

router.post(
    '/login',
    [
        body('username', 'Username is required').notEmpty(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    authController.login
);
router.post('/logoutAll', authMiddleware, authController.logoutAllDevices);

module.exports = router;
