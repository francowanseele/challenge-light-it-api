const fetch = require("node-fetch");
const config = require("../config");

const getSymptomsApiMedic = async () => {
  try {
    const url = `${config.apiMedicUrl}/symptoms?token=${config.apiMedicToken}&language=en-gb`;

    const response = await fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    
    return {
      ok: true,
      body: data,
    };
  } catch (error) {
    // TODO handle error
    return {
      ok: false,
      message: "Error with external provider.",
    };
  }
};

const getDiagnosisApiMedic = async (symptoms, gender, birthYear) => {
  try {
    const url = `${config.apiMedicUrl}/diagnosis?token=${config.apiMedicToken}&language=en-gb&symptoms=[${symptoms}]&gender=${gender}&year_of_birth=${birthYear}`;

    const response = await fetch(url, {
      method: 'get',
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    
    return {
      ok: true,
      body: data,
    };
  } catch (error) {
    // TODO handle error
    return {
      ok: false,
      message: "Error with external provider.",
    };
  }
};

module.exports = {
  getSymptomsApiMedic,
  getDiagnosisApiMedic,
};
