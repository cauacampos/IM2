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
exports.addAgenda = void 0;
const connection_1 = __importDefault(require("../../connection"));
const addAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade } = req.body;
        if (!id || !usuario_id || !titulo || !descricao || !data_hora || !tipo_atividade || !prioridade) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = yield connection_1.default.raw(`
            SELECT * FROM agenda WHERE id = ?;
        `, [id]);
        if (existingUser.length > 0) {
            res.status(409).json({ message: "Agenda já cadastrada" });
            return;
        }
        console.log(id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade);
        yield connection_1.default.raw(`
            INSERT INTO usuarios (id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade]);
        res.status(201).json({ message: "Agenda cadastrado com sucesso!!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addAgenda = addAgenda;
//# sourceMappingURL=addAgenda.js.map