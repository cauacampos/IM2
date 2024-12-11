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
exports.updateAgendaById = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateAgendaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade } = req.body;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID da agenda." });
            return;
        }
        const updates = [];
        const values = [];
        const fields = {
            usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade
        };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'usuario_id':
                    if (value) {
                        updates.push("usuario_id = ?");
                        values.push(value);
                    }
                    break;
                case 'titulo':
                    if (value) {
                        updates.push("titulo = ?");
                        values.push(value);
                    }
                    break;
                case 'descricao':
                    if (value) {
                        updates.push("descricao = ?");
                        values.push(value);
                    }
                    break;
                case 'data_hora':
                    if (value) {
                        updates.push("data_hora = ?");
                        values.push(value);
                    }
                    break;
                case 'tipo_atividade':
                    if (value) {
                        updates.push("tipo_atividade = ?");
                        values.push(value);
                    }
                    break;
                case 'prioridade':
                    if (value) {
                        updates.push("prioridade = ?");
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
            UPDATE agenda 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Agenda não encontrado." });
            return;
        }
        res.status(200).json({ message: "Agenda atualizado com sucesso." });
    }
    catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateAgendaById = updateAgendaById;
//# sourceMappingURL=updateAgendaById.js.map