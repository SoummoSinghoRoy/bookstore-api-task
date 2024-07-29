import { body } from 'express-validator';

const loginValidator = [
  body('email')
    .notEmpty().withMessage(`Email can't be empty`)
    .trim()
  ,
  body('password')
    .notEmpty().withMessage(`Password can't be empty`)
]

export default loginValidator;