const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const todoController = require('../controllers/todoController');


router.post('/create', [
    body('task', 'Task is required').notEmpty(),
], todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.patch('/update/:id', todoController.updateTodo);
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;
