// Importar el modelo
const Apartment = require('../models/apartment.model.js');

/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

const getApartments = async (req, res) => {
    const apartments = await Apartment.find();

    res.render('home', {
        apartments
    });
}

const getApartmentById = async (req, res) => {
    // 1. Vamos al modelo para obtener el apartamento por el id
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment)

    const serviceNames = {
        wifi: "Wi-Fi",
        airConditioner: "Aire acondicionado"
    }

    // Object.keys función de JS que nos devuelve un array con las claves de un objeto: de selectedApartment.services devolverá ["wifi", "airConditioner"...]
    // .filter, filtramos cada service que sea true, es decir, que exista
    const availableServices = Object.keys(selectedApartment.services).filter(service => selectedApartment.services[service])
    
    // .map convierte las claves filtradas en nombres amigables usando el objeto serviceNames, cuando las claves filtradas coinciden con las del objeto
    const availableServicesNames = availableServices.map(service => serviceNames[service])

    res.render('detail-apartment', {
        selectedApartment,
        availableServicesNames
    })
}

const getApartmentsByMaxPrice = async (req, res) => {
    const { maxPrice, location }  = req.query

    const query = {};

    if(maxPrice){
        query.price = { $lte: Number(maxPrice)}
    }

    if(location){
        query.location = location
    }

    // Opción para construir la consulta condicionalmente de manera más compacta pero no la entiendo bien
    // const query = {
    //     ...(maxPrice && { price: { $lte: Number(maxPrice) } }),
    //     ...(location && { location })
    // };

    const apartments = await Apartment.find(query);

    res.render('home', {
        apartments
    });
}

module.exports = {
    getApartments,
    getApartmentById,
    getApartmentsByMaxPrice
}