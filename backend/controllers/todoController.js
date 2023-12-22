const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

const createTodo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { task } = req.body;
        const newTodo = new Todo({
            userId: req.user._id,
            task,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const updateTodo = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;
        const todo = await Todo.findByIdAndUpdate(taskId, updates, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const taskId = req.params.id;
        const todo = await Todo.findById(taskId);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        await Todo.findByIdAndDelete(todo._id)
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
