const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    telefone: {
        type: String,
        required: false,
    },
    cep: {
        type: String,
        required: false,
    },
    logradouro: {
        type: String,
        required: false,
    },
    numero: {
        type: String,
        required: false,
    },
    complemento: {
        type: String,
        required: false,
    },
    bairro: {
        type: String,
        required: false,
    },
    cidade: {
        type: String,
        required: false,
    },
    uf: {
        type: String,
        required: false,
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
