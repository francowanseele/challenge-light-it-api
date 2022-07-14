const { getSymptomsApiMedic, getDiagnosisApiMedic } = require("../externalServices/apiMedic");
const jwt = require('../services/jwt');
const db = require('../data/knex');

async function getSymptoms(_, res) {
    try {
        const symptoms = await getSymptomsApiMedic();
        if (symptoms.ok) {
            res.status(200).send({
                ok: true,
                symptoms: symptoms.body,
                message: 'Symptoms.',
            });
        } else {
            res.status(404).send({
                ok: false,
                message: symptoms.message,
            });
        }
    } catch (error) {
        console.log(error);
        // TODO: Log error
        // Return friendly error
        res.status(501).send({
            ok: false,
            message: 'Server error.',
        });
    }
}

async function getDiagnosis(req, res) {
    try {
        const { symptoms } = req.body;

        const token = req.headers.authorization.replace(/['"]+/g, "");
        var payload = jwt.decodedToken(token);

        const users = await db
            .knex('User')
            .where({ id: payload.id })
            .select('id', 'Male', 'BirthDate');

        const usr = users[0];

        const gender = usr.Male ? 'male' : 'female';
        const birthYear = usr.BirthDate.getFullYear();

        const diagnosis = await getDiagnosisApiMedic(symptoms, gender, birthYear);

        if (diagnosis.ok) {
            res.status(200).send({
                ok: true,
                diagnosis: diagnosis.body,
                message: 'Diagnosis.',
            });
        } else {
            res.status(404).send({
                ok: false,
                message: diagnosis.message,
            });
        }
    } catch (error) {
        // TODO: Log error
        // Return friendly error
        res.status(501).send({
            ok: false,
            message: 'Server error.',
        });
    }
}

module.exports = {
    getSymptoms,
    getDiagnosis,
}