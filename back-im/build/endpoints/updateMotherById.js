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
exports.updateMotherById = void 0;
const connection_1 = __importDefault(require("../connection"));
const updateMotherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id } = req.body;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID da mãe." });
            return;
        }
        const updates = [];
        const values = [];
        const fields = { nome, cargo, gestacao, filhos, dificuldades, necessidades, horario_trabalho, contato, empresa_id };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    if (value) {
                        updates.push("nome = ?");
                        values.push(value);
                    }
                    break;
                case 'cargo':
                    if (value) {
                        updates.push("cargo = ?");
                        values.push(value);
                    }
                    break;
                case 'gestacao':
                    if (value !== undefined) {
                        updates.push("gestacao = ?");
                        values.push(value);
                    }
                    break;
                case 'filhos':
                    if (value !== undefined) {
                        updates.push("filhos = ?");
                        values.push(value);
                    }
                    break;
                case 'dificuldades':
                    if (value) {
                        updates.push("dificuldades = ?");
                        values.push(value);
                    }
                    break;
                case 'necessidades':
                    if (value) {
                        updates.push("necessidades = ?");
                        values.push(value);
                    }
                    break;
                case 'horario_trabalho':
                    if (value) {
                        updates.push("horario_trabalho = ?");
                        values.push(value);
                    }
                    break;
                case 'contato':
                    if (value) {
                        updates.push("contato = ?");
                        values.push(value);
                    }
                    break;
                case 'empresa_id':
                    if (value) {
                        updates.push("empresa_id = ?");
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
            UPDATE mae 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Mãe não encontrada." });
            return;
        }
        res.status(200).json({ message: "Mãe atualizada com sucesso." });
    }
    catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateMotherById = updateMotherById;
//# sourceMappingURL=updateMotherById.js.map