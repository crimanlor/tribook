// Rutas de administrador

// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// Importar todos los controladores de controllers/admin.js
const adminControllers = require('../controllers/admin.js');

// Endpoint de admin que nos permite mostrar la vista de form para añadir un nuevo apartamento
router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm);

// Endpoint de admin para poder añadir apartamento desde la vista del form
router.post('/apartment/new-apartment', adminControllers.postNewApartmentForm)

module.exports = router;