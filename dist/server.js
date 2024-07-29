"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 2080;
const middleware_1 = __importDefault(require("./middleware/middleware"));
(0, middleware_1.default)(app);
const route_1 = __importDefault(require("./api/routes/route"));
(0, route_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map