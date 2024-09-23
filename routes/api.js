const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const { MAX_DOCUMENTS } = require('../config/constants');

const apiControllers = require('../controllers/api');

router.get('/apartments', query("limit").optional().isInt({ min: 1, max: MAX_DOCUMENTS }).withMessage(`The "limit" parameter must be a number between 1 and ${MAX_DOCUMENTS}`), apiControllers.getApartments);

module.exports = router;