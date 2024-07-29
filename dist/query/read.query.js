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
exports.checkUser = exports.fetchCreatedUser = void 0;
const knex_1 = __importDefault(require("../knex/knex"));
const fetchCreatedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default.where('id', userId).select('id', 'email').from('users').first();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchCreatedUser = fetchCreatedUser;
const checkUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield knex_1.default.where('email', email).select('*').from('users').first();
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.checkUser = checkUser;
//# sourceMappingURL=read.query.js.map