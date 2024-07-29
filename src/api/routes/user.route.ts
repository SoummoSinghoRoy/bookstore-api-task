import { Router } from 'express';
const router = Router();
import { userLoginPostController, userLogoutPostController, userSignupPostController } from '../controller/user.controller';
import signupValidator  from '../validation/signup.validation';
import loginValidator from '../validation/login.validation';
import { isAuthenticated, isNotAuthenticated } from '../../middleware/isAuthenticated.middleware';

router.post('/signup', isNotAuthenticated, signupValidator, userSignupPostController);
router.post('/login', isNotAuthenticated, loginValidator, userLoginPostController);
router.post('/logout', isAuthenticated, userLogoutPostController);

export default router;