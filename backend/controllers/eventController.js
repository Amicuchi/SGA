const Event = require('../models/eventModel');
const AppError = require('../utils/appError');

// CREATE EVENT
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        next(error);
    }
};

// LIST ALL EVENTS
exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: {
                events,
            },
        });
    } catch (error) {
        next(error);
    }
};

// GET EVENT BY ID
exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return next(new AppError('Evento não encontrado!', 404));
        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE EVENT
exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return next(new AppError('Evento não encontrado!', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        next(error);
    }
};

// DELETE EVENT
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return next(new AppError('Evento não encontrado!', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};