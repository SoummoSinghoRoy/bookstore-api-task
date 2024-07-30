import { body } from 'express-validator';
import { checkUser } from '../../../query/read.query';

const signupValidator = [
  body('email')
    .notEmpty().withMessage(`Email can't be empty`)
    .trim()
    .normalizeEmail()
    .custom(async (email) => {
      try {
        const user = await checkUser(email);
        if(user) {
          return Promise.reject(`User already exist`)
        }
      } catch (error) {
        console.log(error);
      }
    })
  ,
  body('password')
    .notEmpty().withMessage(`Password can't be empty`)
    .isLength({min: 4, max: 8}).withMessage(`Password length min 4 & max 6`)
    .trim(),
]

export default signupValidator;