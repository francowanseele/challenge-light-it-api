const moment = require('moment');
const jwt = require('../services/jwt');

exports.ensureAuth = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(403).send({message:"Request without headers."});
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decodedToken(token);

        if(payload.exp <= moment.unix()){
            return res.status(404).send({message:"Expired token."});
        } 
    } catch(ex) {
        return res.status(404).send({message:"Invalid token."});
    }

    req.user = payload;
    
    next();
}