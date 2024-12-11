import { Request, Response } from 'express';
import connection from '../../connection'; 

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do usuário em questão." });
            return;
        }

        const result = await connection.raw(`
            DELETE FROM usuarios WHERE id = ?;
        `, [id]);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Usuário não encontrad." });
            return;
        }

        res.status(200).json({ message: "Usuários deletado com sucesso." });
    } catch (error: any) {
        console.error("Erro ao deletar:", error);
        res.status(500).json({ error: error.message });
    }
};