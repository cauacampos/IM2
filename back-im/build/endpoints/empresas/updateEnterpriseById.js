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
exports.updateEnterpriseById = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateEnterpriseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, descricao, cidade, estado, pais, politicas_apoio, data_adesao } = req.body;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID da empresa." });
            return;
        }
        const updates = [];
        const values = [];
        const fields = { nome, descricao, cidade, estado, pais, politicas_apoio, data_adesao };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    if (value) {
                        updates.push("nome = ?");
                        values.push(value);
                    }
                    break;
                case 'descricao':
                    if (value) {
                        updates.push("descricao = ?");
                        values.push(value);
                    }
                    break;
                case 'cidade':
                    if (value) {
                        updates.push("cidade = ?");
                        values.push(value);
                    }
                    break;
                case 'estado':
                    if (value) {
                        updates.push("estado = ?");
                        values.push(value);
                    }
                    break;
                case 'pais':
                    if (value) {
                        updates.push("pais = ?");
                        values.push(value);
                    }
                    break;
                case 'politicas_apoio':
                    if (value) {
                        updates.push("politicas_apoio = ?");
                        values.push(value);
                    }
                    break;
                case 'data_adesao':
                    if (value) {
                        updates.push("data_adesao = ?");
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
            UPDATE empresa 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Empresa não encontrada." });
            return;
        }
        res.status(200).json({ message: "Empresa atualizada com sucesso." });
    }
    catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateEnterpriseById = updateEnterpriseById;
//# sourceMappingURL=updateEnterpriseById.js.map