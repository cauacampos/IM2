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
exports.deleteFilhoById = void 0;
const connection_1 = __importDefault(require("../../connection"));
const deleteFilhoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do filho." });
            return;
        }
        const result = yield connection_1.default.raw(`
            DELETE FROM filhos WHERE id = ?;
        `, [id]);
        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Filhos não encontrada." });
            return;
        }
        res.status(200).json({ message: "Filhos deletada com sucesso." });
    }
    catch (error) {
        console.error("Erro ao deletar:", error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteFilhoById = deleteFilhoById;
//# sourceMappingURL=deleteFilhoById.js.map