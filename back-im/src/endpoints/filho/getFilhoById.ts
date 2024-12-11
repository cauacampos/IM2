import { Request, Response } from 'express';
import connection from '../../connection';

export const getFilhoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const [rows] = await connection.raw('SELECT * FROM filhos WHERE id = ?', [id]);

        if (rows.length === 0) {
            res.status(404).json({ message: 'Filho não encontrado' });
            return;
        }

        res.json(rows[0]);
    } catch (error: any) {
        console.error('Erro ao buscar filho por ID:', error);
        res.status(500).json({ error: error.message });
    }
};