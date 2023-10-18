const utills = require('../../utills/utills');
const service = require('./service');

module.exports = {
    signUp: async function (req, res) {
        service.signUp(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    login: async function (req, res) {
        service.login(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    create: async function (req, res) {
        service.create(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    get: async function (req, res) {
        service.get(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    getFeedback: async function (req, res) {
        service.getFeedback(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    update: async function (req, res) {
        req.body._id = req.body._id;
        service.update(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

    delete: async function (req, res) {
        req.body._id = req.params._id;
        service.delete(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },
    feedbackCreate: async function (req, res) {
        service.feedbackCreate(req.body, function (error, data, message, code) {
            return res.status(code).json(utills.createResult(error, data, message, code));
        });
    },

}