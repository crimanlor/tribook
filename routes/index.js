// Rutas "públicas" de la app
const express = require('express');
const router = express.Router();

// Importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index.js');

// Endpoint que nos muestra la Home
router.get('/', indexControllers.getApartments);


// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;