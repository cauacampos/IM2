import { Request, Response } from 'express';
import connection from '../../connection';

export const getAllAgenda = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await connection.raw('SELECT * FROM agenda');
        res.json(rows);
    } catch (error: any) {
        console.error('Erro ao buscar todas agendas:', error);
        res.status(500).json({ error: error.message });
    }
};