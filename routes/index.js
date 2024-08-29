// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// Importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index.js');

// Endpoint que nos muestra la Home
router.get('/', indexControllers.getApartments);

// Ruta dinámica para el detalle del apartamento
router.get('/apartment/:idApartment', indexControllers.getApartmentById)

// Ruta para filtrar apartamentos por precio máximo/noche
router.get('/search', indexControllers.getApartmentsByMaxPrice)

// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;