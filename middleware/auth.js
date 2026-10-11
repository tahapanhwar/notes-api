const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({message: 'No token provided'})
    }

    const token = header.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (err){
     return res.status(401).json({message: 'Invalid or expired token'}) 
    }
//     console.log('header:', header);
// console.log('token:', token);
// console.log('decoded:', decoded);
};

module.exports = auth;
