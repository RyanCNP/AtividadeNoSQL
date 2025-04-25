import { ObjectId } from "mongodb";

export const createStorage = async (req, res) => {
    try {
        const { cod_prod, qtd_estoque } = req.body
        const db = req.app.locals.db

        const existingStorage = await db.collection("estoque").findOne({ cod_prod })
        if (existingStorage) {
            return res.status(409).json({ error: true, message: "Este produto já existe no Estoque" })
        }

        const newStorage = { cod_prod, qtd_estoque }
        const result = await db.collection("estoque").insertOne(newStorage)

        res.status(201).json({ _id: result.insertedId, ...newStorage })
    } catch (error) {
        console.error("Erro ao criar registro:", error);
        res.status(500).json({ error: true, message: "Falha ao cadastar item no estoque" });
    }
}

export const getStorageByProduct = async (req, res) => {
    try {
        const { cod_prod } = req.params;
        const db = req.app.locals.db;

        const storage = await db.collection("estoque").findOne({ cod_prod });
        if (!storage) {
            return res.status(404).json({ error: true, message: "Este produto não está registrado no estoque" });
        }

        res.status(200).json(storage);
    } catch (error) {
        console.error("Erro ao buscar produto no estoque:", error);
        res.status(500).json({ error: true, message: "Falha ao buscar produto no estoque" });
    }
}

export const updateStorage = async (req, res) => {
    try {
        const { cod_prod } = req.params;
        const { qtd_estoque } = req.body;
        const db = req.app.locals.db;

        const existingStorage = await db.collection("estoque").findOne({ cod_prod });
        if (!existingStorage) {
            return res.status(404).json({ error: true, message: "Este produto não está registrado no estoque" });
        }

        const updatedStorage = {
            $set: {
                qtd_estoque,
                upDate: new Date().toISOString(),
            },
        };

        const result = await db.collection("estoque").updateOne({ cod_prod }, updatedStorage);
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: true, message: "Este produto não está registrado no estoque"})
        }

        const updatedProduct = await db.collection("estoque").findOne({ cod_prod });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Erro ao atualizar produto no estoque:", error);
        res.status(500).json({ error: true, message: "Falha ao atualizar produto no estoque" });
    }
}

export const deleteStorage = async (req, res) => {
    try {
        const { cod_prod } = req.params;
        const db = req.app.locals.db;

        const result = await db.collection("estoque").deleteOne({ cod_prod });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: true, message: "Este produto não está registrado no estoque" });
        }

        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        res.status(500).json({ error: true, message: "Falha ao deletar produto" });
    }
};

export const getStorageList = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const storageList = await db.collection("estoque").find().toArray();
        res.status(200).json(storageList);
    } catch (error) {
        console.error("Erro ao buscar produtos no estoque:", error);
        res.status(500).json({ error: true, message: "Falha ao buscar produtos no estoque" });
    }
};