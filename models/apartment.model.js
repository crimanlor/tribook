// Your code here ...
const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        city: {
            type: String,
            required: true
        },
        province: {
            type: String
        },
        coordinates: {
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            }
        }
    },
    description: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
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
    photos: {
        type: [{
            url: {
                type: String, 
                required: true,
            },
            descriptionPhoto: {
                type: String,
                maxlength: 50,
                default: ""
            }
        }],
        validate: {
            validator: function(photos) {
                return photos.length <= 4;
            },
            message: 'Solo se pueden añadir un máximo de cuatro fotografías adicionales'
        }
    },
    mainPhoto: {
        type: String,
        required: true,
        match: [ /^(https):\/\/[^\s/$.?#].[^\s]*$/i, 'Por favor ingrese una URL válida']
    },
    capacity: {
        type: String,
        enum: ["one-person", "two-persons", "three-persons", "four-persons"]
    },
    bookings: [
        {
          startDate: Date,
          endDate: Date
        }
    ],
    services: {
        wifi: { type: Boolean, default: false },
        airConditioner: {type: Boolean, default: false },
        heater: { type: Boolean, default: false },
        accesibility: { type: Boolean, default: false },
        tv: { type: Boolean, default: false },
        kitchen: { type: Boolean, default: false }
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Apartment = model('Apartment', apartmentSchema);

module.exports = Apartment;