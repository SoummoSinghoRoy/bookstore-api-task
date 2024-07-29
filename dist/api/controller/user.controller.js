"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogoutPostController = exports.userLoginPostController = exports.userSignupPostController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_env_variable_1 = __importDefault(require("../../config/custom-env-variable"));
const express_validator_1 = require("express-validator");
const create_query_1 = require("../../query/create.query");
const read_query_1 = require("../../query/read.query");
const userSignupPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req).formatWith(err => err.msg);
    if (!errors.isEmpty()) {
        const response = {
            status: 400,
            message: `Validation error`,
            error: {
                message: errors.mapped()
            }
        };
        res.json(response);
    }
    else {
        try {
            const hashed = yield bcrypt_1.default.hash(password, 8);
            const user = yield (0, create_query_1.addUser)({ email: email, password: hashed });
            const response = {
                status: 200,
                message: `Signup Successfully`,
                data: {
                    id: user.id,
                    email: user.email
                }
            };
            res.json(response);
        }
        catch (error) {
            console.log(error);
            const response = {
                status: 500,
                message: 'Internal server error',
                error: { message: 'Error occurred, get back soon' }
            };
            res.json(response);
        }
    }
});
exports.userSignupPostController = userSignupPostController;
const userLoginPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req).formatWith(err => err.msg);
    if (!errors.isEmpty()) {
        const response = {
            status: 400,
            message: `Validation error`,
            error: {
                message: errors.mapped()
            }
        };
        res.json(response);
    }
    else {
        try {
            const validUser = yield (0, read_query_1.checkUser)(email);
            if (validUser) {
                const match = yield bcrypt_1.default.compare(password, validUser.password);
                if (match) {
                    const token = jsonwebtoken_1.default.sign({
                        id: validUser.id,
                        emal: validUser.email
                    }, custom_env_variable_1.default.secret_key, { expiresIn: '10h' });
                    const response = {
                        status: 200,
                        message: `Logged In successfully`,
                        token: `Bearer ${token}`
                    };
                    res.json(response);
                }
                else {
                    const response = {
                        status: 404,
                        message: `Wrong credentials`,
                        error: {
                            message: `Password incorrect`
                        }
                    };
                    res.json(response);
                }
            }
            else {
                const response = {
                    status: 404,
                    message: `Wrong credentials`,
                    error: {
                        message: `Invalid email`
                    }
                };
                res.json(response);
            }
        }
        catch (error) {
            console.log(error);
            const response = {
                status: 500,
                message: 'Internal server error',
                error: { message: 'Error occurred, get back soon' }
            };
            res.json(response);
        }
    }
});
exports.userLoginPostController = userLoginPostController;
const userLogoutPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    try {
        const response = {
            status: 200,
            message: 'Successfully loggedout',
            isAuthenticated: false
        };
        customReq.user = null;
        res.json(response);
    }
    catch (error) {
        console.log(error);
        const response = {
            status: 500,
            message: 'Internal server error'
        };
        res.json(response);
    }
});
exports.userLogoutPostController = userLogoutPostController;
//# sourceMappingURL=user.controller.js.map