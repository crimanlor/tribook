// Importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = async (req, res) => {

    res.render('new-apartment.ejs')
}

// 3º paso para poder añadir apartamento después de crear el form y tras crear el endpoint en admin.js routes.
const postNewApartmentForm = async (req, res) => {
    const { title, location, description, price, size, mainPhoto, capacity } = req.body

    await Apartment.create({
        title,
        location,
        description,
        price,
        size,
        mainPhoto,
        capacity,
        services: {
            wifi: req.body.wifi === 'true',
            airConditioner: req.body.airConditioner === 'true'
        }
    })
    res.send('Apartamento creado')
    
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartmentForm
}

