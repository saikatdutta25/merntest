require('dotenv').config();
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const todoRoutes = require('./routes/todoRoutes');
const authMiddleware = require('./middleware/authmiddleware');
const app = express();
// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
// Routes
app.use('/auth', authRoutes);
app.use('/todo', authMiddleware, todoRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, "Route not found"));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res
        .status(err.status || 500)
        .json({ status: "Failed", errCode: err.status, message: err.message });
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
