import { Request, Response } from 'express';
import connection from '../../connection'; 

export const addAgenda = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade } = req.body;

        if (!id || !usuario_id || !titulo|| !descricao || !data_hora || !tipo_atividade || !prioridade) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = await connection.raw(`
            SELECT * FROM agenda WHERE id = ?;
        `, [id]);

        if (existingUser.length > 0) {
            res.status(409).json({ message: "Agenda já cadastrada" });
            return;
        }
        console.log(id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade);

        await connection.raw(`
            INSERT INTO usuarios (id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [id, usuario_id, titulo, descricao, data_hora, tipo_atividade, prioridade]);

        res.status(201).json({ message: "Agenda cadastrado com sucesso!!" });
    } catch (error: any) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
};
