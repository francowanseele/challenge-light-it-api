const jwt = require('jwt-simple');
const moment = require("moment");
const { secretKey } = require('../config');

exports.createAccessToken = function(user) {
    const payload = {
        id: user.id,
        Name: user.Name,
        Lastname: user.Lastname,
        Email: user.Email,
        createToken: moment().unix(),
        exp: moment().add(3, 'hours').unix(),
    };

    return jwt.encode(payload, secretKey);
}

exports.createRefreshToken = function(user){
    const payload = {
        id: user.id,
        exp: moment().add(30, 'days').unix(),
    };

    return jwt.encode(payload, secretKey);
}

exports.decodedToken = function(token) {
    return jwt.decode(token, secretKey, true);
}
