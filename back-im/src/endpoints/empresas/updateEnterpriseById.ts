import { Request, Response } from 'express';
import connection from '../../connection';

export const updateEnterpriseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nome, descricao, cidade, estado, pais, politicas_apoio, data_adesao } = req.body;

        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID da empresa." });
            return;
        }
        const updates: string[] = [];
        const values: any[] = [];
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
        const result = await connection.raw(`
            UPDATE empresa 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Empresa não encontrada." });
            return;
        }
        res.status(200).json({ message: "Empresa atualizada com sucesso." });
    } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
};
