const express = require('express');
const UserController = require('../controllers/user');

const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/login', UserController.logIn);
api.post('/signin', UserController.signIn);
api.post('/diagnosis/:idDiagnosis', [md_auth.ensureAuth], UserController.addDiagnosis);
api.get('/diagnosis', [md_auth.ensureAuth], UserController.getDiagnosisByUser);

module.exports = api;
