import { body } from 'express-validator';
import { checkAuthor } from '../../../query/read.query';

const authorValidator = [
  body('name')
    .notEmpty().withMessage(`Author name can't be empty`)
    .trim()
    .custom(async (name) => {
      const author = await checkAuthor(name);
      if(author) {
        return Promise.reject(`Author already exist`)
      } 
    })
  ,
  body('birthdate')
    .notEmpty().withMessage(`Birthdate can't be empty`)
  ,

]

export default authorValidator;