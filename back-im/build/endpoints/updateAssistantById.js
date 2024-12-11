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
exports.updateAssistantById = void 0;
const connection_1 = __importDefault(require("../connection"));
const updateAssistantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, especializacao, disponibilidade, endereco, telefone, experiencia, qualificacoes } = req.body;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do assistente." });
            return;
        }
        const updates = [];
        const values = [];
        const fields = {
            nome,
            especializacao,
            disponibilidade,
            endereco,
            telefone,
            experiencia,
            qualificacoes
        };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    if (value) {
                        updates.push("nome = ?");
                        values.push(value);
                    }
                    break;
                case 'especializacao':
                    if (value) {
                        updates.push("especializacao = ?");
                        values.push(value);
                    }
                    break;
                case 'disponibilidade':
                    if (value) {
                        updates.push("disponibilidade = ?");
                        values.push(value);
                    }
                    break;
                case 'endereco':
                    if (value) {
                        updates.push("endereco = ?");
                        values.push(value);
                    }
                    break;
                case 'telefone':
                    if (value) {
                        updates.push("telefone = ?");
                        values.push(value);
                    }
                    break;
                case 'experiencia':
                    if (value) {
                        updates.push("experiencia = ?");
                        values.push(value);
                    }
                    break;
                case 'qualificacoes':
                    if (value) {
                        updates.push("qualificacoes = ?");
                        values.push(value);
                    }
                    break;
                default:
                    break;
            }
        });
        if (updates.length === 0) {
            res.status(400).json({ error: "Por favor, forneça ao menos um campo para atualizar." });
            return;
        }
        values.push(id);
        const result = yield connection_1.default.raw(`
            UPDATE assistente 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Assistente não encontrado." });
            return;
        }
        res.status(200).json({ message: "Assistente atualizado com sucesso." });
    }
    catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateAssistantById = updateAssistantById;
//# sourceMappingURL=updateAssistantById.js.map