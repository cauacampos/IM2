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
const connection_1 = __importDefault(require("../../connection"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nome, email, senha, cidade, estado, pais } = req.body;
        if (!id || !nome || !email || !senha || !cidade || !estado || !pais) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = yield connection_1.default.raw(`
            SELECT * FROM usuarios WHERE id = ?;
        `, [id]);
        if (existingUser.length > 0) {
            res.status(409).json({ message: "Assistente já cadastrado" });
            return;
        }
        console.log(id, nome, email, senha, cidade, estado, pais);
        yield connection_1.default.raw(`
            INSERT INTO usuarios (id, nome, email, senha, cidade, estado, pais)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [id, nome, cidade, estado, senha, cidade, estado, pais]);
        res.status(201).json({ message: "Usuário cadastrado com sucesso!!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addUser = addUser;
//# sourceMappingURL=addUser.js.map