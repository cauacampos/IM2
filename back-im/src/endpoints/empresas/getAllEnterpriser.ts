import { Request, Response } from 'express';
import connection from '../../connection';

export const getAllEnterprise = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await connection.raw('SELECT * FROM empresa');
        res.json(rows);
    } catch (error: any) {
        console.error('Erro ao buscar todas as mães:', error);
        res.status(500).json({ error: error.message });
    }
};
