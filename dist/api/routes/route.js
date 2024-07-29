"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const routes = [
    {
        path: '/api/user',
        handler: user_route_1.default
    },
    {
        path: '/',
        handler: (res) => {
            res.status(200).json({
                msg: `Server running properly`
            });
        }
    }
];
exports.default = (app) => {
    routes.forEach(route => {
        if (route.path == '/') {
            app.get(route.path, route.handler);
        }
        else {
            app.use(route.path, route.handler);
        }
    });
};
//# sourceMappingURL=route.js.map