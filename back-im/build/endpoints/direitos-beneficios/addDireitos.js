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
exports.addDireitos = void 0;
const connection_1 = __importDefault(require("../../connection"));
const addDireitos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, titulo, descricao, link_oficial, data_publicacao } = req.body;
        if (!id || !titulo || !descricao || !link_oficial || !data_publicacao) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = yield connection_1.default.raw(`
            SELECT * FROM direitos_beneficios WHERE id = ?;
        `, [id]);
        if (existingUser.length > 0) {
            res.status(409).json({ message: "Direito e beneficio já cadastrado" });
            return;
        }
        console.log(id, titulo, descricao, link_oficial, data_publicacao);
        yield connection_1.default.raw(`
            INSERT INTO direitos_beneficios (id, titulo, descricao, link_oficial, data_publicacao)
            VALUES (?, ?, ?, ?, ?);
        `, [id, titulo, descricao, link_oficial, data_publicacao]);
        res.status(201).json({ message: "Direito e beneficio cadastrado com sucesso!!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addDireitos = addDireitos;
//# sourceMappingURL=addDireitos.js.map