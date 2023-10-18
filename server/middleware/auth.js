const jwt = require('jsonwebtoken');
const utill = require('../utills/utills');

function tokenVerification(req, res, next) {
    var token = req.header('Authorization');
    if (!token) return res.status(403).send(utill.createResult("Token is required", null, "User is not login", 403));
    try {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            req.user = decoded;
            if (err) return res.status(400).send(utill.createResult(err, null, "Invailid token", 400));
            next();
        });
    }
    catch (err) {
        return res.status(400).send(utill.createResult(err, null, "Somthing went worng", 400));
    }
}

function adminVerification(req, res, next) {
    if (req?.user?.role !== 'admin') return res.status(403).send(utill.createResult("Access denied", null, "User is not admin", 403));
    next();
}

module.exports = {
    tokenVerification: tokenVerification,
    adminVerification: adminVerification
}