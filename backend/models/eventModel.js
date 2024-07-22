const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'O título do evento é obrigatório'],
    },
    description: {
        type: String,
        required: [true, 'A descrição do evento é obrigatória'],
    },
    date: {
        type: Date,
        required: [true, 'A data do evento é obrigatória'],
    },
    location: {
        type: String,
        required: [true, 'A localização do evento é obrigatória'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
