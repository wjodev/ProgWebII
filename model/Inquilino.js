const mongoose = require('../db/bancoDadosMongoDB')
const Schema = mongoose.Schema

const Inquilino = new Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },

})

mongoose.model("inquilino", Inquilino)