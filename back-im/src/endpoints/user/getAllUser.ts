import { Request, Response } from 'express';
import connection from '../../connection';

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await connection.raw('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error: any) {
        console.error('Erro ao buscar todos os usuarios:', error);
        res.status(500).json({ error: error.message });
    }
};