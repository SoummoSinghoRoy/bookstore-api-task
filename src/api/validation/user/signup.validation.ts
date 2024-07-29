import { body } from 'express-validator';

const signupValidator = [
  body('email')
    .notEmpty().withMessage(`Email can't be empty`)
    .trim()
    .normalizeEmail()
  ,
  body('password')
    .notEmpty().withMessage(`Password can't be empty`)
    .isLength({min: 4, max: 8}).withMessage(`Password can't less than 4 chars`)
    .trim(),
]

export default signupValidator;