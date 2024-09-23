// Importar el modelo
const Apartment = require('../models/apartment.model.js');

// Importar variable de límite
const { MAX_DOCUMENTS } = require('../config/constants.js')
const { validationResult } = require('express-validator');

const getApartments = async (req, res) => {
    // Validaciones
    // Comprobar el valor del parámetro req.query.limit entre 1 y 100000 
    // Además de comprobar si es un número

    // Validación sin express-validator
    // if(req.query.limit < 1 || req.query.limit > 100000){
    //     return res.status(400).json({
    //         message: "The limit parameter must be a number between 1 and 100000"
    //     })
    // }

    // Validación con express-validator (también hay código en routes/api.js)
    const result = validationResult(req);

    // si validation result devuelve algún valor que ha habido algun parámetro que no ha pasado el proceso de validación
    if (!result.isEmpty()) {
        return res.status(400).json({
            message: result.array()[0].msg
        })
    }

    // 1. Ir al modelo y obtener los apartamentos hasta 100000
    const limit = req.query.limit || MAX_DOCUMENTS;
    const apartments = await Apartment.find().limit(limit);
    
    // 2. Devolver una respuesta
    res.status(200).json({
        message: "Query executed succesfully",
        results: apartments // Completar después con todos los apartamentos de la DB
    })
}

module.exports = {
    getApartments
}