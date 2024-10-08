// Importar el modelo
const Apartment = require('../models/apartment.model.js');

/** Crear un conjunto de funciones que van a dar respuesta a nuestras rutas  */

const getApartments = async (req, res) => {
    const apartments = await Apartment.find({ isAvailable: true });

    const serviceNames = {
        wifi: { name: "WiFi", icon: 'fa fa-fw fa-wifi' },
        airConditioner: { name: "Aire acondicionado", icon: 'fa fa-fw fa-snowflake-o' },
        heater: { name: "Calefacción", icon: 'fa fa-fw fa-thermometer-half' },
        accesibility: { name: "Accesible", icon: 'fa fa-fw fa-wheelchair' },
        tv: { name: "Televisión", icon: 'fa fa-fw fa-tv' },
        kitchen: { name: "Cocina", icon: 'fa fa-fw fa-cutlery' }
    };

    const apartmentsWithServices = apartments.map(apartment => {
        const availableServices = Object.keys(apartment.services).filter(service => apartment.services[service]);

        const availableServicesNames = availableServices.map(service => serviceNames[service]);

        return {
            ...apartment.toObject(),  // convertir el documento a objeto para manipularlo
            availableServicesNames   // añadir los servicios con sus nombres e íconos
        };
    });

    res.render('home', {
        apartments: apartmentsWithServices
    });
};

const getAboutUs = async (req, res) => {
    res.render('about-us');
}

const getContact = async (req, res) => {
    res.render('contact');
}

const getApartmentById = async (req, res) => {
    const { idApartment } = req.params;

    const selectedApartment = await Apartment.findById(idApartment)

    const serviceNames = {
        wifi: { name: "WiFi", icon: 'fa fa-fw fa-wifi' },
        airConditioner: { name: "Aire acondicionado", icon: 'fa fa-fw fa-snowflake-o' },
        heater: { name: "Calefacción", icon: 'fa fa-fw fa-thermometer-half' },
        accesibility: { name: "Accesible", icon: 'fa fa-fw fa-wheelchair' },
        tv: { name: "Televisión", icon: 'fa fa-fw fa-tv' },
        kitchen: { name: "Cocina", icon: 'fa fa-fw fa-cutlery' }
    };

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

const searchApartments = async (req, res) => {
    const { maxPrice, city, capacity, startDate, endDate }  = req.query
    const query = {};

    if(maxPrice){
        query.price = { $lte: Number(maxPrice)}
    }

    if(city){
        query['location.city'] = city;
    }

    if(capacity){
        query.capacity = capacity
    }

    if(startDate && endDate){
        const start = new Date(startDate).toISOString();
        const end = new Date(endDate).toISOString();

        // Hay que excluir apartamentos que tienen una reserva que se solape el rango de fechas (start y end) proporcionado por el usuario.
        query.bookings = {
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

    const apartments = await Apartment.find(query);

    const serviceNames = {
        wifi: { name: "WiFi", icon: 'fa fa-fw fa-wifi' },
        airConditioner: { name: "Aire acondicionado", icon: 'fa fa-fw fa-snowflake-o' },
        heater: { name: "Calefacción", icon: 'fa fa-fw fa-thermometer-half' },
        accesibility: { name: "Accesible", icon: 'fa fa-fw fa-wheelchair' },
        tv: { name: "Televisión", icon: 'fa fa-fw fa-tv' },
        kitchen: { name: "Cocina", icon: 'fa fa-fw fa-cutlery' }
    };

    const apartmentsWithServices = apartments.map(apartment => {
        const availableServices = Object.keys(apartment.services).filter(service => apartment.services[service]);
        const availableServicesNames = availableServices.map(service => serviceNames[service]);

        return {
            ...apartment.toObject(),  // convertir el documento a objeto para manipularlo
            availableServicesNames   // añadir los servicios con sus nombres e íconos
        };
    });

    res.render('home', {
        apartments: apartmentsWithServices
    });
}

const getBookingForm = async (req, res) => {
    const { idApartment } = req.params;
    const apartment = await Apartment.findById(idApartment);
    res.render('new-booking', {
        apartment
    })
}

const postBookingForm = async (req, res) => {
    const { idApartment, startDate, endDate } = req.body;
    const apartment = await Apartment.findById(idApartment);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isBooked = apartment.bookings.some(booking => {
        return (start < booking.endDate && end > booking.startDate);
    });

    if (isBooked) {
        req.flash('error_msg', `El apartamento no está disponible para las fechas indicadas.`);
        return res.render('new-booking', {
            apartment,
            isBooked: true, // Reservado
        });
    }

    const newBooking = { 
        startDate: start,
        endDate: end
    }

    apartment.bookings.push(newBooking)
    await apartment.save();
    req.flash('success_msg', `La reserva ha sido realizada correctamente.`);
    res.render('new-booking', {
        apartment,
        isBooked: false, // No reservado
    });

}

module.exports = {
    getApartments,
    getAboutUs,
    getContact,
    getApartmentById,
    searchApartments,
    getBookingForm,
    postBookingForm
}