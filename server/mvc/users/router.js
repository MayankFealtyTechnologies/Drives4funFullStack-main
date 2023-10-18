const express = require('express');
const { body, param } = require('express-validator');
const { requestValidate } = require('../../middleware/requestValidate');
const router = express.Router();
const controller = require('./controller');
const { tokenVerification, adminVerification } = require('../../middleware/auth');


router.post('/user/sign-up', controller.signUp);

router.post('/user/login',
    body('email').exists().trim().withMessage('email is required.'),
    body('password').exists().trim().withMessage('Password is required.'),
    requestValidate,
    controller.login);

router.post('/quotation/create',
    body('name').exists().trim().withMessage('name is required.'),
    body('mobile').exists().trim().withMessage('mobile is required.'),
    requestValidate,
    controller.create);

router.post('/quotation/get-all',
    tokenVerification,
    adminVerification,
    controller.get);


router.post('/feedback/get-all',
    tokenVerification,
    adminVerification,
    controller.getFeedback);

router.post('/quotation/update',
    body('_id').exists().trim().withMessage('id is required.'),
    requestValidate,
    tokenVerification,
    adminVerification,
    controller.update);

router.delete('/quotation/delete/:_id',
    param('_id').exists().trim().withMessage('id is required.'),
    requestValidate,
    tokenVerification,
    adminVerification,
    controller.delete);

router.post('/feedback/create',
    body('name').exists().trim().withMessage('name is required.'),
    body('mobile').exists().trim().withMessage('mobile is required.'),
    body('feedback').exists().trim().withMessage('feedback is required.'),
    requestValidate,
    controller.feedbackCreate);

module.exports = router;