"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env_variables = {
    db_name: process.env.DB_URI || '',
    db_user: process.env.DB_ADMIN || '',
    db_password: process.env.DB_PASSWORD || '',
    db_host: process.env.DB_HOST || '',
    db_port: process.env.DB_PORT || 3306,
    secret_key: process.env.SECRET || ''
};
exports.default = env_variables;
//# sourceMappingURL=custom-env-variable.js.map