import { ObjectId } from "mongodb";

// Get all products with optional pagination and sorting
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, nome, categoria, marca, sort, order = "asc" } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (nome) {
      query.nome = { $regex: nome, $options: "i" };
    }
    if (categoria) {
      query.categoria = { $regex: categoria, $options: "i" };
    }
    if (marca) {
      query.marca = { $regex: marca, $options: "i" };
    }

    const db = req.app.locals.db;

    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order.toLowerCase() === "desc" ? -1 : 1;
    } else {
      sortOptions.nome = 1;
    }

    const products = await db.collection("produtos").find(query).sort(sortOptions).skip(Number(skip)).limit(Number(limit)).toArray();
    const total = await db.collection("produtos").countDocuments(query);

    res.status(200).json({
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: true, message: "Falha ao buscar produtos" });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;

    const product = await db.collection("produtos").findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ error: true, message: "Produto não encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: true, message: "Falha ao buscar produto" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { nome, categoria, marca, descricao, preco, cod_prod } = req.body;
    const db = req.app.locals.db;

    const existingProduct = await db.collection("produtos").findOne({ cod_prod });
    if (existingProduct) {
      return res.status(409).json({ error: true, message: "Produto com este código já existe" });
    }

    const newProduct = { nome, categoria, marca, descricao, preco, cod_prod };
    const result = await db.collection("produtos").insertOne(newProduct);

    res.status(201).json({ _id: result.insertedId, ...newProduct });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: true, message: "Falha ao criar produto" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const db = req.app.locals.db;

    const result = await db.collection("produtos").updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: true, message: "Produto não encontrado" });
    }

    const updatedProduct = await db.collection("produtos").findOne({ _id: new ObjectId(id) });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: true, message: "Falha ao atualizar produto" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;

    const result = await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: true, message: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: true, message: "Falha ao deletar produto" });
  }
};

// Get product stock
export const getStockByProduct = async (req, res) => {
  try {
    const { cod_prod } = req.params;
    const db = req.app.locals.db;

    const stock = await db.collection("estoque").find({ cod_prod }).toArray();
    if (!stock || stock.length === 0) {
      return res.status(404).json({ error: true, message: "Estoque não encontrado para este produto" });
    }

    res.status(200).json(stock);
  } catch (error) {
    console.error("Erro ao buscar estoque do produto:", error);
    res.status(500).json({ error: true, message: "Falha ao buscar estoque do produto" });
  }
};

// Update product stock
export const updateStock = async (req, res) => {
  try {
    const { cod_prod } = req.params;
    const { qtd, descricao, exitDate = null } = req.body;
    const db = req.app.locals.db;

    const existingStock = await db.collection("estoque").findOne({ cod_prod, exitDate: null });
    if (!existingStock) {
      return res.status(404).json({ error: true, message: "Produto não encontrado no estoque" });
    }

    const updatedStock = {
      $set: {
        qtd: existingStock.qtd + qtd,
        descricao: descricao || existingStock.descricao,
        exitDate: exitDate,
        upDate: new Date().toISOString(),
      },
    };

    const result = await db.collection("estoque").updateOne({ cod_prod, exitDate: null }, updatedStock);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: true, message: "Estoque não encontrado para atualização" });
    }

    const updatedInventory = await db.collection("estoque").findOne({ cod_prod, exitDate: null });
    res.status(200).json(updatedInventory);
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    res.status(500).json({ error: true, message: "Falha ao atualizar estoque" });
  }
};
