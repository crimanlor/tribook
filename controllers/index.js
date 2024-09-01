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
    const { maxPrice, location, capacity, startDate, endDate }  = req.query

    const query = {};

    if(maxPrice){
        query.price = { $lte: Number(maxPrice)}
    }

    if(location){
        query.location = location
    }

    if(capacity){
        query.capacity = capacity
    }

    if(startDate && endDate){
        const start = new Date(startDate).toISOString();
        const end = new Date(endDate).toISOString();

        // Hay que excluir apartamentos que tienen una reserva que se solape el rango de fechas (start y end) proporcionado por el usuario.
        query.reservations = {
            // Si elemMatch encuentra una reserva que se solape, not hará que el apartamento no sea incluido en los resultados.
            $not: {
                $elemMatch: {
                    // Reservas cuya startDate (fecha de inicio) sea anterior a la fecha de fin (end) proporcionada.
                    startDate: { $lt: end },
                    // Reservas cuya endtDate (fecha de finalización) sea posterior a la fecha de inicio (start) proporcionada.
                    endDate: { $gt: start }
                }
            }
        };
    }

    // Opción para construir la consulta condicionalmente de manera más compacta pero no la entiendo bien
    // const query = {
    //     ...(maxPrice && { price: { $lte: Number(maxPrice) } }),
    // ...(location && { location }),
    // ...(capacity && { capacity }),
    // ...(startDate && endDate && {
    //     reservations: {
    //         $not: {
    //             $elemMatch: {
    //                 startDate: { $lt: new Date(endDate) },
    //                 endDate: { $gt: new Date(startDate) }
    //             }
    //         }
    //     }
    // })
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