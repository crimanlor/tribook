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
        if (!apartment.location) {
            apartment.location = {};
        }
       
    }

    res.render('new-apartment', {
        apartment
    })
}

const postNewApartmentForm = async (req, res) => {
    const { id, title, city, province, description, rules, rooms, beds, bathrooms, price, size, mainPhoto, descriptionPhoto1, photo2, descriptionPhoto2, photo3, descriptionPhoto3, photo4, descriptionPhoto4, capacity } = req.body

    const photos = [
        { url: mainPhoto, descriptionPhoto: descriptionPhoto1 || "" },
        { url: photo2, descriptionPhoto: descriptionPhoto2 || "" },
        { url: photo3, descriptionPhoto: descriptionPhoto3 || "" },
        { url: photo4, descriptionPhoto: descriptionPhoto4 || "" }
    ].filter(photo => photo.url); 

    if (photos.length > 4) {
        req.flash('error_msg', 'Solo se pueden añadir un máximo de cuatro fotografías.');
        return res.redirect('back');
    }

    const coordinates = {
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }

    const apartment = {
        title,
        location: {
            city,
            province,
            coordinates
        },
        description,
        rules,
        rooms,
        beds,
        bathrooms,
        price,
        size,
        photos,
        mainPhoto,
        capacity,
        services: {
            wifi: req.body.wifi === 'true',
            airConditioner: req.body.airConditioner === 'true',
            heater: req.body.heater === 'true',
            accesibility: req.body.accesibility === 'true',
            tv: req.body.tv === 'true',
            kitchen: req.body.kitchen === 'true',
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

