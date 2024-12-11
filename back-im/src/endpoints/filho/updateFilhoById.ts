import { Request, Response } from 'express';
import connection from '../../connection';

export const updateFilhoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { usuario_id, nome, data_nascimento, genero, saude_especial } = req.body;

        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do filho." });
            return;
        }
        const updates: string[] = [];
        const values: any[] = [];
        const fields = { usuario_id, nome, data_nascimento, genero, saude_especial };

        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
                case 'usuario_id':
                    if (value) {
                        updates.push("usuario_id = ?");
                        values.push(value);
                    }
                    break;
                case 'nome':
                    if (value) {
                        updates.push("nome = ?");
                        values.push(value);
                    }
                    break;
                case 'data_nascimento':
                    if (value) {
                        updates.push("data_nascimento = ?");
                        values.push(value);
                    }
                    break;
                case 'genero':
                    if (value) {
                        updates.push("genero = ?");
                        values.push(value);
                    }
                    break;
                case 'saude_especial':
                    if (value) {
                        updates.push("saude_especial = ?");
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
            UPDATE filhos 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Filho não encontrado." });
            return;
        }
        res.status(200).json({ message: "Filho atualizado com sucesso." });
    } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
};
