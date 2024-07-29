"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const signupValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage(`Email can't be empty`)
        .trim()
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage(`Password can't be empty`)
        .isLength({ min: 4, max: 8 }).withMessage(`Password can't less than 4 chars`)
        .trim(),
];
exports.default = signupValidator;
//# sourceMappingURL=signup.validation.js.map