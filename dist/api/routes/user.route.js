"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controller/user.controller");
const signup_validation_1 = __importDefault(require("../validation/user/signup.validation"));
const login_validation_1 = __importDefault(require("../validation/user/login.validation"));
const isAuthenticated_middleware_1 = require("../../middleware/isAuthenticated.middleware");
router.post('/signup', isAuthenticated_middleware_1.isNotAuthenticated, signup_validation_1.default, user_controller_1.userSignupPostController);
router.post('/login', isAuthenticated_middleware_1.isNotAuthenticated, login_validation_1.default, user_controller_1.userLoginPostController);
router.post('/logout', isAuthenticated_middleware_1.isAuthenticated, user_controller_1.userLogoutPostController);
exports.default = router;
//# sourceMappingURL=user.route.js.map