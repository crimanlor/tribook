// Your code here ...
const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true,
        min: 0
    },
    mainPhoto: {
        type: String,
        required: true,
        match: [ /^(https):\/\/[^\s/$.?#].[^\s]*$/i, 'Por favor ingrese una URL válida']
    },
    services: {
        wifi: { type: Boolean, default: false },
        airConditioner: {type: Boolean, default: false }
        // kitchen: { type: Boolean, default: false },
        // disability: { type: Boolean, default: false },
        // heater: { type: Boolean, default: false },
        // tv: { type: Boolean, default: false },
    }

});

const Apartment = model('Apartment', apartmentSchema);

// Exportamos un único recurso
module.exports = Apartment;