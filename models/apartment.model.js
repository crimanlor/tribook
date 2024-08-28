// Your code here ...
const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
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
        // : ['^https?:\/\/[^\s\/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|tiff|svg)$', 'URL not valid']
    },
    services: {
        // array de strings 
        // ["wifi", "air aconditionar"]
        // objeto con los servicios { wifi: true, airConditioner: false}
        wifi: Boolean,
        airConditioner: Boolean,
        kitchen: Boolean,
        disability: Boolean,
        heater: Boolean,
        tv: Boolean
    }

});

const Apartment = model('Apartment', apartmentSchema);

// Exporta un único recurso
module.exports = Apartment;