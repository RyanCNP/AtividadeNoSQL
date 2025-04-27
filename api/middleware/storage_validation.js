import { check, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: "Erro de validação",
            errors: errors.array(),
        });
    }
    next();
};

export const validadeteObjectId = [
    param("id").isMongoId().withMessage("Formato de Id inválido!"),
    validateRequest
];

export const validatetStorage = [
    check("cod_prod")
        .notEmpty()
        .withMessage("Código do produto é obrigatório.")
        .isLength({ max: 10 })
        .withMessage("O código do produto deve ter no máximo 10 caracteres.")
        .matches(/^[A-Z]{2}-[A-Z]{3}-\d{3}$/)
        .withMessage("Formato inválido. Use o padrão: AA-AAA-001.")
        .custom(async (cod_prod, { req }) => {
            const db = req.app.locals.db;
            const query = { cod_prod };
            if (req.method === "PUT" && req.params.id) {
                query["_id"] = { $ne: new ObjectId(req.params.id) };
            }
            const existe = await db.collection("storage").countDocuments(query);
            if (existe > 0) {
                throw new Error("O produto informado ja está cadastrado no estoque");
            }
            return true;
        }),
    check("descricao")
        .notEmpty()
        .withMessage("A descrição é obrigatória.")
        .isLength({ max: 200 })
        .withMessage("A descrição deve ter no máximo 200 caracteres."),
    check("qtd")
        .notEmpty()
        .withMessage("A quantidade é obrigatória.")
        .isInt({ min: 0, max: 999 })
        .withMessage("A quantidade deve ser um número inteiro entre 0 e 999."),

    validateRequest
];

export const validateStorageUpdate = [
    check("cod_prod")
        .notEmpty()
        .withMessage("Código do produto é obrigatório.")
        .isLength({ max: 10 })
        .withMessage("O código do produto deve ter no máximo 10 caracteres.")
        .matches(/^[A-Z]{2}-[A-Z]{3}-\d{3}$/)
        .withMessage("Formato inválido. Use o padrão: AA-AAA-001.")
        .custom(async (cod_prod, { req }) => {
            const db = req.app.locals.db;
            const query = { cod_prod };
            if (req.method === "PUT" && req.params.id) {
                query["_id"] = { $ne: new ObjectId(req.params.id) };s
            }
            const existe = await db.collection("storage").countDocuments(query);
            if (existe > 0) {
                throw new Error("O produto informado ja está cadastrado no estoque");
            }
            return true;
        }),
    check("descricao")
        .notEmpty()
        .withMessage("A descrição é obrigatória.")
        .isLength({ max: 200 })
        .withMessage("A descrição deve ter no máximo 200 caracteres."),
    check("qtd")
        .notEmpty()
        .withMessage("A quantidade é obrigatória.")
        .isInt({ min: 0, max: 999 })
        .withMessage("A quantidade deve ser um número inteiro entre 0 e 999."),

    validateRequest
];