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
exports.addFilho = void 0;
const connection_1 = __importDefault(require("../../connection"));
const addFilho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, usuario_id, nome, data_nascimento, genero, saude_especial } = req.body;
        if (!id || !usuario_id || !nome || !data_nascimento || !genero || !saude_especial) {
            res.status(400).json({ error: "Informe todos os campos" });
            return;
        }
        const [existingFilho] = yield connection_1.default.raw(`
            SELECT * FROM filhos WHERE id = ?;
        `, [id]);
        if (existingFilho.length > 0) {
            res.status(409).json({ message: "Filho ja cadastrado" });
            return;
        }
        yield connection_1.default.raw(`
            INSERT INTO filhos (id, usuario_id, nome, data_nascimento, genero, saude_especial)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [id, usuario_id, nome, data_nascimento, genero, saude_especial]);
        res.status(201).json({ message: "Filho cadastrado com sucesso!!" });
    }
    catch (error) {
        console.error("Erro ao cadastrar/verificar filho:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.addFilho = addFilho;
//# sourceMappingURL=addFilho.js.map