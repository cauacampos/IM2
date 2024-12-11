import { Request, Response } from 'express';
import connection from '../../connection';

export const getAllFilho = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await connection.raw('SELECT * FROM filhos');
        res.json(rows);
    } catch (error: any) {
        console.error('Erro ao buscar todos os filhos:', error);
        res.status(500).json({ error: error.message });
    }
};
