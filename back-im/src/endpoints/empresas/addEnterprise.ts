import { Request, Response } from 'express';
import connection from '../../connection';

export const addEnterprise = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, nome, descricao, cidade, estado, pais, politicas_apoio, data_adesao } = req.body;

        if (!id || !nome || !descricao || !cidade || !estado || !pais || !politicas_apoio || !data_adesao) {
            res.status(400).json({ error: "Informe todos os campos" });
            return;
        }
        const [existingEnterprise] = await connection.raw(`
            SELECT * FROM empresa WHERE id = ?;
        `, [id]);

        if (existingEnterprise.length > 0) {
            res.status(409).json({ message: "Empresa já cadastrada" });
            return;
        }
        await connection.raw(`
            INSERT INTO empresa (id, nome, descricao, cidade, estado, pais, politicas_apoio, data_adesao)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [id, nome, descricao, cidade]);

        res.status(201).json({ message: "Empresa cadastrada com sucesso!!" });
    } catch (error: any) {
        console.error("Erro ao cadastrar/verificar empresa:", error);
        res.status(500).json({ error: error.message });
    }
};
