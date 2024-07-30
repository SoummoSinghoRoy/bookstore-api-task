import { body } from 'express-validator';
import { checkAuthor } from '../../../query/read.query';

const editBookValidator = [
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
    const author = await checkAuthor(parseInt(author_id));
    if(!author) {
      return Promise.reject(`Author not found`)
    } 
  })
]

export default editBookValidator;