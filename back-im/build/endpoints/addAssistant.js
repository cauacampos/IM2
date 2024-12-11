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
exports.addAssistant = void 0;
const connection_1 = __importDefault(require("../connection"));
const addAssistant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nome, especializacao, disponibilidade, endereco, telefone, experiencia, qualificacoes, } = req.body;
        if (!id || !nome || !especializacao || !disponibilidade || !endereco || !telefone || !experiencia || !qualificacoes) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        console.log(id, nome, especializacao, disponibilidade, endereco, telefone, experiencia, qualificacoes);
        yield connection_1.default.raw(`
            INSERT INTO users (id, nome, especializacao, disponibilidade, endereco, telefone, experiencia, qualificacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [id, nome, endereco, telefone, disponibilidade, endereco, telefone, experiencia, qualificacoes]);
        res.status(201).json({ message: "Assistente cadastrado com sucesso!!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addAssistant = addAssistant;
//# sourceMappingURL=addAssistant.js.map