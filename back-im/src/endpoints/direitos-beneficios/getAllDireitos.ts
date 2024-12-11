import { Request, Response } from 'express';
import connection from '../../connection';

export const getAllDireitos = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await connection.raw('SELECT * FROM direitos_beneficios');
        res.json(rows);
    } catch (error: any) {
        console.error('Erro ao buscar todos os direitos/beneficios:', error);
        res.status(500).json({ error: error.message });
    }
};