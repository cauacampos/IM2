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
exports.addaluno = void 0;
const connection_1 = __importDefault(require("../connection"));
const addaluno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, matricula, email, idade, id } = req.body;
        if (!nome || !matricula || !email || !idade || !id) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        console.log(nome, matricula, email, idade);
        yield connection_1.default.raw(`
            INSERT INTO users (id, nome, matricula, email, idade)
            VALUES (id, nome, matricula, email, idade);
        `, [id, nome, matricula, email, idade]);
        res.status(201).json({ message: "Aluno adicionado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addaluno = addaluno;
//# sourceMappingURL=addaluno.js.map