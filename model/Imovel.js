const mongoose = require('../db/bancoDadosMongoDB')
const Schema = mongoose.Schema

const Imovel = new Schema({
    matricula: {
        type: String,
        required: true,
    },
    cep: {
        type: Number,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,

    }
})

mongoose.model("imovel", Imovel)
