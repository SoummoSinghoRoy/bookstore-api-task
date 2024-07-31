import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import env_variables from "../../config/custom-env-variable";
import { UserApiResponse } from "../../Types/user.type";
import { addUser } from "../../query/create.query";
import { checkUser } from "../../query/read.query";
import { CustomRequest } from "../../middleware/isAuthenticated.middleware";


const userSignupPostController = async(req: Request, res: Response): Promise<void> => {
  let {email, password} = req.body

  const errors = validationResult(req).formatWith(err => err.msg);
  if(!errors.isEmpty()) {
    const response: UserApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const hashed = await bcrypt.hash(password, 8);
      const user = await addUser({email: email, password: hashed});
      const response: UserApiResponse = {
        status: 200,
        message: `Signup Successfully`,
        data: {
          id: user.id,
          email: user.email
        }
      }
      res.json(response);
    } catch (error) {
      console.log(error);
      const response: UserApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response)
    }
  }
}

const userLoginPostController = async (req: Request, res: Response): Promise<void> => {
  let {email, password} = req.body

  const errors = validationResult(req).formatWith(err => err.msg);
  if(!errors.isEmpty()) {
    const response: UserApiResponse = {
      status: 400,
      message: `Validation error`,
      error: {
        message: errors.mapped()
      }
    }
    res.json(response);
  } else {
    try {
      const validUser = await checkUser(email);
      if(validUser) {
        const match = await bcrypt.compare(password, validUser.password);
        if(match) {
          const token = jwt.sign({
            id: validUser.id,
            emal: validUser.email
          }, env_variables.secret_key, { expiresIn: '10h' });
          const response: UserApiResponse = {
            status: 200,
            message: `Logged In successfully`,
            token: `Bearer ${token}`
          }
          res.json(response);
        } else {
          const response: UserApiResponse = {
            status: 404,
            message: `Wrong credentials`,
            error: {
              message: `Password incorrect`
            }
          }
          res.json(response);
        }
      } else {
        const response: UserApiResponse = {
          status: 404,
          message: `Wrong credentials`,
          error: {
            message: `Invalid email`
          }
        }
        res.json(response);
      }
    } catch (error) {
      console.log(error);
      const response: UserApiResponse = {
        status: 500,
        message: 'Internal server error',
        error: { message: 'Error occurred, get back soon' }
      }
      res.json(response)
    }
  }
}

const userLogoutPostController = async (req: Request, res: Response): Promise<void> => {
  const customReq = req as CustomRequest;
  try {    
    const response: UserApiResponse = {
      status: 200,
      message: 'Successfully loggedout',
      isAuthenticated: false
    }
    customReq.user = null
    res.json(response);
  } catch (error) {
    console.log(error);
    const response: UserApiResponse = {
      status: 500,
      message: 'Internal server error'
    }
    res.json(response);
  }
}

export {
  userSignupPostController,
  userLoginPostController,
  userLogoutPostController
}