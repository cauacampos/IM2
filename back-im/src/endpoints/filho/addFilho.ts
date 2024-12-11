import { Request, Response } from 'express';
import connection from '../../connection';

export const addFilho = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, usuario_id, nome, data_nascimento, genero, saude_especial } = req.body;

        if (!id || !usuario_id || !nome || !data_nascimento || !genero || !saude_especial) {
            res.status(400).json({ error: "Informe todos os campos" });
            return;
        }
        const [existingFilho] = await connection.raw(`
            SELECT * FROM filhos WHERE id = ?;
        `, [id]);

        if (existingFilho.length > 0) {
            res.status(409).json({ message: "Filho ja cadastrado" });
            return;
        }
        await connection.raw(`
            INSERT INTO filhos (id, usuario_id, nome, data_nascimento, genero, saude_especial)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [id, usuario_id, nome, data_nascimento, genero, saude_especial]);

        res.status(201).json({ message: "Filho cadastrado com sucesso!!" });
    } catch (error: any) {
        console.error("Erro ao cadastrar/verificar filho:", error);
        res.status(500).json({ error: error.message });
    }
};
