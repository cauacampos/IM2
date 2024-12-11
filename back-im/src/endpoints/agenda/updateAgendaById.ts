import { Request, Response } from 'express';
import connection from '../../connection';

export const updateAgendaById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade
        } = req.body;

        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID da agenda." });
            return;
        }

        const updates: string[] = [];
        const values: any[] = [];

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

        const result = await connection.raw(`
            UPDATE agenda 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Agenda não encontrado." });
            return;
        }
        res.status(200).json({ message: "Agenda atualizado com sucesso." });
    } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
};
