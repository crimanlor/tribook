// Importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = async (req, res) => {

    // Obtener todos los apartmentos de la base de datos
    const apartments = await Apartment.find();

    res.render('new-apartment.ejs')
}

// 3º paso para poder añadir apartamento después de crear el form y tras crear el endpoint en admin.js routes.
const postNewApartmentForm = async (req, res) => {
    
    await Apartment.create({
        title: req.body.title,
        price: req.body.price,
        size: req.body.size,
        mainPhoto: req.body.mainPhoto
    })
    res.send('Apartamento creado')
    
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartmentForm
}

