import { Request, Response } from 'express';
import connection from '../../connection';

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const {
            nome,
            email, 
            senha, 
            cidade, 
            estado, 
            pais
        } = req.body;

        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do usuário." });
            return;
        }

        const updates: string[] = [];
        const values: any[] = [];

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

        const result = await connection.raw(`
            UPDATE usuarios 
            SET ${updates.join(", ")} 
            WHERE id = ?;
        `, values);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Usuario não encontrado." });
            return;
        }
        res.status(200).json({ message: "Usuario atualizado com sucesso." });
    } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        res.status(500).json({ error: error.message });
    }
};
