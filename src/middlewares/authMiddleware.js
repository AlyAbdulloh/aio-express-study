//
require('dotenv').config();
const jwt = require('jsonwebtoken');

const {API_SECRET} =process.env

const authorizationMiddleware = (allowedRoles) => {
    return  (req, res, next) => {
        let token = req.headers.authorization;
        token= token.split(" ");

        if(token.length > 1){
            token = token[1];
        }else token=token[0];

        if(!token){
            return res.status(401).json({message: "Unauthorized - Token not provided"});
        }

        jwt.verify(token, API_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Unauthorized Invalid Token'});
            }

            req.user = decoded;
            const userRole = req.user ? req.user.role: 'guest';
            console.log('oioi', userRole);

            if(allowedRoles.includes(userRole)){
                next();
            }else{
                res.status(403).json({message: 'Forbidden'});
            }
        })
    }
}

module.exports = authorizationMiddleware;