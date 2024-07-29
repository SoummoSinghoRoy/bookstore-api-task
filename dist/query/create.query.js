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
exports.addUser = void 0;
const knex_1 = __importDefault(require("../knex/knex"));
const read_query_1 = require("./read.query");
const addUser = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserId = yield (0, knex_1.default)('users').insert({ email: userdata.email, password: userdata.password });
        const user = yield (0, read_query_1.fetchCreatedUser)(newUserId[0]);
        return user;
    }
    catch (error) {
        console.log(error);
    }
});
exports.addUser = addUser;
//# sourceMappingURL=create.query.js.map