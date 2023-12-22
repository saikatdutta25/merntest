const User = require('../models/User');
const { validationResult } = require('express-validator');
const generateToken = require('../config/jwt');

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fullname, username, password } = req.body;
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ fullname, username, password });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a new token for the current login
        const token = generateToken(user._id);
        // Remove all active sessions for this user
        user.activeSessions = [];
        await user.save();
        // Add the new token to the active sessions list
        user.activeSessions.push({ token });
        await user.save();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const logoutAllDevices = async (req, res) => {
    try {
        const user = req.user;
        // Remove all active sessions for this user
        user.activeSessions = [];
        await user.save();

        res.json({ message: 'Logged out from all devices' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { register, login, logoutAllDevices };
