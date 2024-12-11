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
exports.addmae = void 0;
const connection_1 = __importDefault(require("../connection"));
const addmae = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id } = req.body;
        if (!id || !nome || !cargo || !gestacao || !filhos || !dificuldades || !necessidades || !horario_trabalho || !contato || !empresa_id) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        console.log(id, nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id);
        yield connection_1.default.raw(`
            INSERT INTO users (id, nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [id, nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id]);
        res.status(201).json({ message: "Mãe cadastrada com sucesso" });
    }
    catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addmae = addmae;
//# sourceMappingURL=addmother.js.map