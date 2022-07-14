const jwt = require('../services/jwt')
const moment = require('moment')

function willExpireToken(token) {
    const { exp } = jwt.decodedToken(token)
    const currentDate = moment().unix()

    if (currentDate > exp) {
        return true
    } else {
        return false
    }
}

function refreshAccessToken(req, res) {
    const { refreshToken } = req.body
    const isTokenExpired = willExpireToken(refreshToken)

    if (isTokenExpired) {
        res.status(404).send({ message: 'Expired Refresh Token' })
    } else {
        const { id } = jwt.decodedToken(refreshToken)

        User.findOne({ _id: id }, (err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'Server error.' })
            } else if (!userStored) {
                res.status(404).send({ message: 'User does not exist.' })
            } else {
                res.status(200).send({
                    accessToken: jwt.createAccessToken(userStored),
                    refreshToken: refreshToken,
                })
            }
        })
    }
}

module.exports = {
    refreshAccessToken,
}
