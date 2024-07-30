import { body } from 'express-validator';

const EditAuthorValidator = [
  body('name')
    .notEmpty().withMessage(`Author name can't be empty`)
    .trim()
  ,
  body('birthdate')
    .notEmpty().withMessage(`Birthdate can't be empty`)
  ,

]

export default EditAuthorValidator;