import { body, ValidationChain } from 'express-validator';
import { checkAuthor } from '../../../query/read.query';

const editBookValidator: ValidationChain[]  = [
  body('title')
    .notEmpty().withMessage(`Title can't be empty`)
    .trim()
  ,
  body('published_date')
    .notEmpty().withMessage(`Published date can't be empty`)
  ,
  body('author_id')
  .notEmpty().withMessage(`Author is required`)
  .custom(async (author_id) => {
    try {
      const author = await checkAuthor(parseInt(author_id));
      if(!author) {
        return Promise.reject(`Author not found`)
      }
    } catch (error) {
      console.log(error);
    } 
  })
]

export default editBookValidator;