const { body, validationResult } = require('express-validator');

function userValidation() {
    return async (req, res, next) => {
        await body('email').trim().isEmail().withMessage('Email is invalid!').toLowerCase().run(req);
        await body('password').trim().isLength({ min: 4 }).withMessage('Password should be at least 4 characters!').run(req);
        await body('repass').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                return 'Passwords do not match!';
            }
            return true;
        }).run(req);

        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            req.userErrors = {
                name: 'inputError',
                message: errors.map(x => x.msg)
            }
        }
        next();
    };
};

function tripValidation() {
    return async (req, res, next) => {
        await body('start').trim().isLength({ min: 4 }).withMessage('Start point should be at least 4 characters!').toLowerCase().run(req);
        await body('end').trim().isLength({ min: 4 }).withMessage('End point should be at least 4 characters!').toLowerCase().run(req);
        await body('seats').isNumeric({ min: 0, max: 4 }).withMessage('Seats should be between 0 and 4!').toInt().run(req);
        await body('description').isLength({ min: 10 }).withMessage('Description should be up 10 characters!').run(req);
        await body('carImage').isURL().withMessage('Car image url is invalid!').run(req);
        await body('carBrand').trim().isLength({ min: 4 }).withMessage('Car brand should be at least 4 characters!').run(req);
        await body('price').isNumeric({ min: 1, max: 50 }).withMessage('Price should be between 1 and 50!').toFloat().run(req);
       
        const errors = validationResult(req).errors;
        if (errors.length > 0) {
            req.tripErrors = {
                name: 'inputError',
                message: errors.map(x => x.msg)
            }
        }
        next();
    };
};


module.exports = {
    userValidation,
    tripValidation
}