"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.listen(3000, () => {
    console.log('Server is running  in http://localhost:3000');
});
//# sourceMappingURL=app.js.map