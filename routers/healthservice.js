const express = require('express');
const HealthServiceController = require('../controllers/healthservice');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.get('/symptoms', [md_auth.ensureAuth], HealthServiceController.getSymptoms);
api.post('/diagnosis', [md_auth.ensureAuth], HealthServiceController.getDiagnosis);

module.exports = api;
