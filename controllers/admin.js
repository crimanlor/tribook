// Importar el modelo
const Apartment = require('../models/apartment.model.js');

const getNewApartmentForm = async (req, res) => {
    const { idApartment } = req.params;
    let apartment = {}

    if (idApartment) {
        apartment = await Apartment.findById(idApartment);
        if (!apartment.services) {
            apartment.services = {}; // Asegura que services siempre sea un objeto
        }
    }

    res.render('new-apartment', {
        apartment
    })
}

const postNewApartmentForm = async (req, res) => {
    const { id, title, location, description, price, size, mainPhoto, capacity } = req.body

    const apartment = {
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
    }

    // Editar apartamento
    if (id){
        await Apartment.findByIdAndUpdate(id, apartment);
        req.flash('success_msg', `El apartamento ha sido actualizado correctamente por el administrador`)
        res.redirect('/');
    }

    // Crear nuevo apartamento
    await Apartment.create(apartment)
    req.flash('success_msg', `El apartamento ha sido creado correctamente por el administrador`);
    res.redirect('/');
    
}

const getEditApartmentForm = async (req, res) => {
    const { idApartment } = req.params;
    const apartment = await Apartment.findById(idApartment);
    const availableServices = Object.keys(apartment.services).filter(service => apartment.services[service])

    res.render('new-apartment', {
        apartment,
        availableServices
    })
}

// named exports (expotamos varios recursos, lo hacemos como un objeto)
module.exports = {
    getNewApartmentForm,
    postNewApartmentForm,
    getEditApartmentForm
}

