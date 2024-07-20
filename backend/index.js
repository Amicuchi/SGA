const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute')
const app = express();

// 1) MIDDLEWARES
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRouter);

// 3) MONGO.BD CONNECTION
mongoose.set('strictQuery', true);
    // Essa configuração se fez necessária a partir do Mongoose 7.
    // strictQuery: false: Permite consultas em campos não definidos no esquema, mais flexível, mas menos seguro.
    // strictQuery: true: Restringe consultas apenas aos campos definidos no esquema, mais seguro, mas menos flexível.
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
    .then( () => console.log('Connected to MongoDB!'))
    .catch( (error) => console.log('Failed to connect to MongoDB', error));

// 4) GLOBAL ERROR HANDLER
app.use( (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode || 500).json({
        status: err.status,
        message: err.message,
    });
});

// 5) SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
})