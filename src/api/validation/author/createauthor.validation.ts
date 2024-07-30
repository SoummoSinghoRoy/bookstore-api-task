import { body } from 'express-validator';
import { checkAuthor } from '../../../query/read.query';

const createAuthorValidator = [
  body('name')
    .notEmpty().withMessage(`Author name can't be empty`)
    .trim()
    .custom(async (name) => {
      try {
        const author = await checkAuthor(name);
        if(author) {
          return Promise.reject(`Author already exist`);
        }
      } catch (error) {
        console.log(error)
      }
    })
  ,
  body('birthdate')
    .notEmpty().withMessage(`Birthdate can't be empty`)
  ,

]

export default createAuthorValidator;