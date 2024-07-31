import { body, ValidationChain } from 'express-validator';

const loginValidator: ValidationChain[] = [
  body('email')
    .notEmpty().withMessage(`Email can't be empty`)
    .trim()
  ,
  body('password')
    .notEmpty().withMessage(`Password can't be empty`)
]

export default loginValidator;