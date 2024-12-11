import { Request, Response } from 'express';
import connection from '../../connection'; 

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, nome, email, senha, cidade, estado, pais } = req.body;

        if (!id || !nome || !email|| !senha || !cidade || !estado || !pais) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = await connection.raw(`
            SELECT * FROM usuarios WHERE id = ?;
        `, [id]);

        if (existingUser.length > 0) {
            res.status(409).json({ message: "Assistente já cadastrado" });
            return;
        }
        console.log(id, nome, email, senha, cidade, estado, pais);

        await connection.raw(`
            INSERT INTO usuarios (id, nome, email, senha, cidade, estado, pais)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [id, nome, cidade, estado, senha, cidade, estado, pais]);

        res.status(201).json({ message: "Usuário cadastrado com sucesso!!" });
    } catch (error: any) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
};



