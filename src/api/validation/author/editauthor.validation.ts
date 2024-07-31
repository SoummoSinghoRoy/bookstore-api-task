import { body, ValidationChain } from 'express-validator';

const EditAuthorValidator: ValidationChain[]  = [
  body('name')
    .notEmpty().withMessage(`Author name can't be empty`)
    .trim()
  ,
  body('birthdate')
    .notEmpty().withMessage(`Birthdate can't be empty`)
  ,

]

export default EditAuthorValidator;