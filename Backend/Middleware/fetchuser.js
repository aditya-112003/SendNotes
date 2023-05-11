const jwt = require('jsonwebtoken');
const jwt_secret = 'thisisthetopsecretcode@##$'

const fetchuser = (req, res, next) => {
    //get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('invalid token request ')
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send('invalid token 2 request')
    }
}

module.exports = fetchuser;