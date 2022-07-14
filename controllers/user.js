const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const db = require("../data/knex");

async function signIn(req, res) {
  try {
    const { name, lastname, email, password, repeatPassword, male, birthDate } =
      req.body;

    const existUser = await db
      .knex("User")
      .where({ Email: email.toLowerCase() })
      .select("id");

    if (existUser.length > 0) {
      res.status(403).send({
        ok: false,
        message: "User exist.",
      });
    } else {
      if (!password || !repeatPassword) {
        res.status(404).send({ message: "Password required." });
      } else {
        if (password !== repeatPassword) {
          res.status(404).send({
            message: "Different passwords.",
          });
        } else {
          // Encrypt password
          bcrypt.hash(password, null, null, async function (err, hash) {
            if (err) {
              res.status(500).send({
                message: "Server error.",
              });
            } else {
              const usrs = await db
                .knex("User")
                .insert({
                  Name: name,
                  Lastname: lastname,
                  Email: email.toLowerCase(),
                  Password: hash,
                  Male: male,
                  BirthDate: birthDate,
                })
                .returning([
                  "id",
                  "Name",
                  "Lastname",
                  "Email",
                  "Male",
                  "BirthDate",
                ]);

              res.status(200).send({
                ok: true,
                accessToken: jwt.createAccessToken(usrs[0]),
                refreshToken: jwt.createRefreshToken(usrs[0]),
                message: "User created.",
              });
            }
          });
        }
      }
    }
  } catch (error) {
    // TODO: Log error
    // Return friendly error
    console.log(error);
    res.status(501).send({
      ok: false,
      message: "Server error.",
    });
  }
}

async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    const users = await db
      .knex("User")
      .where({ Email: email.toLowerCase() })
      .select(
        "id",
        "Name",
        "Lastname",
        "Email",
        "Male",
        "BirthDate",
        "Password"
      );

    if (users.length == 1) {
      const usr = users[0];
      bcrypt.compare(password, usr.Password, function (err, resultPass) {
        if (resultPass) {
          res.status(200).send({
            ok: true,
            accessToken: jwt.createAccessToken(users[0]),
            refreshToken: jwt.createRefreshToken(users[0]),
            message: "User logged.",
          });
        } else {
          res.status(404).send({
            ok: false,
            message: "Incorrect password.",
          });
        }
      });
    }
  } catch (error) {
    // TODO: Log error
    // Return friendly error
    res.status(501).send({
      ok: false,
      message: "Server error.",
    });
  }
}

async function addDiagnosis(req, res) {
  try {
    const { idDiagnosis } = req.params;
    const { name, accuracy } = req.body;

    const token = req.headers.authorization.replace(/['"]+/g, "");
    var payload = jwt.decodedToken(token);

    const diagnosis = await db
      .knex("Diagnosis")
      .insert({
        Name: name,
        Accuracy: accuracy,
        UserId: payload.id,
        DiagnosisId: idDiagnosis,
      })
      .returning(["id", "Name", "Accuracy", "UserId", "DiagnosisId"]);

    if (diagnosis.length == 1) {
      res.status(200).send({
        ok: true,
        diagnosis: diagnosis[0],
        message: "Diagnosis saved.",
      });
    }
  } catch (error) {
    // TODO: Log error
    // Return friendly error
    res.status(501).send({
      ok: false,
      message: "Server error.",
    });
  }
}

async function getDiagnosisByUser(req, res) {
  try {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    var payload = jwt.decodedToken(token);

    const diagnosis = await db
      .knex("Diagnosis")
      .where({ UserId: payload.id })
      .select("id", "Name as name", "Accuracy as accuracy");

    res.status(200).send({
      ok: true,
      diagnosis: diagnosis,
      message: "Diagnosis.",
    });
  } catch (error) {
    console.log(error);
    // TODO: Log error
    // Return friendly error
    res.status(501).send({
      ok: false,
      message: "Server error.",
    });
  }
}

module.exports = {
  signIn,
  logIn,
  addDiagnosis,
  getDiagnosisByUser,
};
