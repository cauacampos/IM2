import { Request, Response } from 'express';
import connection from '../../connection'; 

export const addDireitos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, titulo, descricao, link_oficial, data_publicacao } = req.body;

        if (!id || !titulo || !descricao|| !link_oficial || !data_publicacao) {
            res.status(400).json({ error: "Por favor, preencha todos os campos." });
            return;
        }
        const [existingUser] = await connection.raw(`
            SELECT * FROM direitos_beneficios WHERE id = ?;
        `, [id]);

        if (existingUser.length > 0) {
            res.status(409).json({ message: "Direito e beneficio já cadastrado" });
            return;
        }
        console.log(id, titulo, descricao, link_oficial, data_publicacao);

        await connection.raw(`
            INSERT INTO direitos_beneficios (id, titulo, descricao, link_oficial, data_publicacao)
            VALUES (?, ?, ?, ?, ?);
        `, [id, titulo, descricao, link_oficial, data_publicacao]);

        res.status(201).json({ message: "Direito e beneficio cadastrado com sucesso!!" });
    } catch (error: any) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: error.message });
    }
};



