// importar el modelo
const Apartment = require('../models/apartment.model.js');

/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

const getApartments = async (req, res) => {
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}

module.exports = {
    getApartments
}