const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// REGISTER USER
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne( {email: req.body.email} );
        if (user) {
            return next(new AppError('Esse usuário já existe!', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // Assign JWT (Json Web Token)
        const token = jwt.sign({ _id: newUser._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(201).json({
            status: 'success',
            message: 'Usuário registrado com sucesso!',
            token,
            user: {
                _id: newUser._id,
                role: newUser.role,
                name: newUser.name,
                email: newUser.email,
                cpf: newUser.cpf,
                telefone: newUser.telefone,
                cep: newUser.cep,
                logradouro: newUser.logradouro,
                numero: newUser.numero,
                complemento: newUser.complemento,
                bairro: newUser.bairro,
                cidade: newUser.cidade,
                uf: newUser.uf,
            },
        })

    } catch (error) {
        next(error);
    }
};

// LOGGING USER
exports.login = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne( {email} );
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!user) return next(new AppError('Usuário não encontrado!', 404));

        if (!isPasswordValid){
            return next(new AppError('Email ou senha inválido.', 401));
        }

        const token = jwt.sign({ _id: user._id}, 'secretkey123', {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logado com sucesso.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        next(error)
    }
};

// LIST ALL USERS
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    } catch (error) {
        next(error);
    }
};

// GET USER BY ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(new AppError('Usuário não encontrado!', 404));
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE USER
exports.updateUser = async (req, res, next) => {
    try {
        const { password, ...updateData } = req.body;

        // Se a senha estiver presente nos dados de atualização, criptografe-a
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        // Atualiza o usuário com os dados fornecidos
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        const user = await User.findByIdAndUpdate(req.params.id, updateData, {

            new: true,
            runValidators: true,
        });
    
        if (!user) {
            return next(new AppError('Usuário não encontrado!', 404));
        }
    
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
        } catch (error) {
            next(error);
    }
};
  
// DELETE USER
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
    
        if (!user) {
            return next(new AppError('Usuário não encontrado!', 404));
        }
    
        res.status(204).json({
            status: 'success',
            data: null,
        });
        } catch (error) {
            next(error);
    }
};