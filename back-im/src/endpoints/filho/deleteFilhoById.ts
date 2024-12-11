import { Request, Response } from 'express';
import connection from '../../connection'; 

export const deleteFilhoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Por favor, forneça o ID do filho." });
            return;
        }
        const result = await connection.raw(`
            DELETE FROM filhos WHERE id = ?;
        `, [id]);

        if (result[0].affectedRows === 0) {
            res.status(404).json({ error: "Filhos não encontrada." });
            return;
        }

        res.status(200).json({ message: "Filhos deletada com sucesso." });
    } catch (error: any) {
        console.error("Erro ao deletar:", error);
        res.status(500).json({ error: error.message });
    }
};
