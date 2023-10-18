const { validationResult } = require('express-validator');
const utills = require('../utills/utills');

function requestValidate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(utills.createResult(errors.array(), null, "error found", 400));
    else next();
}

module.exports = { requestValidate }