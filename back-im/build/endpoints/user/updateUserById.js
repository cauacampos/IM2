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
exports.updateUserById = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nome, email, senha, cidade, estado, pais } = req.body;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do usuário." });
            return;
        }
        const updates = [];
        const values = [];
        const fields = {
            nome,
            email,
            senha,
            cidade,
            estado,
            pais
        };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'nome':
                    if (value) {
                        updates.push("nome = ?");
                        values.push(value);
                    }
                    break;
                case 'email':
                    if (value) {
                        updates.push("email = ?");
                        values.push(value);
                    }
                    break;
                case 'senha':
                    if (value) {
                        updates.push("senha = ?");
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
            UPDATE usuarios 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Usuario não encontrado." });
            return;
        }
        res.status(200).json({ message: "Usuario atualizado com sucesso." });
    }
    catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=updateUserById.js.map