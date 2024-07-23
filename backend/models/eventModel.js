const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    responsavel: {
        type: String,
        required: [true, 'O usuário responsável pelo evento é obrigatório'],
    },
    idEvent: {
        type: String,
        required: [true, 'O identificador do evento é obrigatória'],
    },
    eventType: {
        type: String,
        required: [true, 'O tipo do evento é obrigatório'],
    },
    nomeEvent: {
        type: String,
        required: [true, 'O nome do evento é obrigatório'],
    },
    dataEvento: {
        type: Date,
        required: [true, 'A data do evento é obrigatória'],
    },
    horarioInicio: {
        type: String,
    },
    horarioFim: {
        type: String,
    },
    descricao: {
        type: String,
    },
    maisInformacoes: {
        type: String,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
