"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const loginValidator = [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage(`Email can't be empty`)
        .trim(),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage(`Password can't be empty`)
];
exports.default = loginValidator;
//# sourceMappingURL=login.validation.js.map