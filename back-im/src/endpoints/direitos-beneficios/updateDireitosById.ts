import { Request, Response } from 'express';
import connection from '../../connection';

export const updateDireitosById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            titulo, descricao, link_oficial, data_publicacao
        } = req.body;

        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do direito/beneficio." });
            return;
        }

        const updates: string[] = [];
        const values: any[] = [];

        const fields = {
            titulo, descricao, link_oficial, data_publicacao
        };
        Object.entries(fields).forEach(([key, value]) => {
            switch (key) {
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
                case 'link_oficial':
                    if (value) {
                        updates.push("link_oficial = ?");
                        values.push(value);
                    }
                    break;
                case 'data_publicacao':
                    if (value) {
                        updates.push("data_publicacao = ?");
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
            UPDATE direitos_beneficios 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Direito/beneficio não encontrado." });
            return;
        }
        res.status(200).json({ message: "Direito/beneficio atualizado com sucesso." });
    } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
};
