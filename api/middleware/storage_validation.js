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

export const validadetObjectId = [
    param("id").isMongoId().withMessage("Formato de Id inválido!"),
    validateRequest
];

export const validateStorage = [
    check("cod_prod")
        .notEmpty()
        .withMessage("Código do produto é obrigatório.")
        .isLength({ max: 10 })
        .withMessage("O código do produto deve ter no máximo 10 caracteres.")
        .matches(/^[A-Z]{2}-[A-Z]{3}-\d{3}$/)
        .withMessage("Formato inválido. Use o padrão: AA-AAA-001."),
    check("descricao")
        .notEmpty()
        .withMessage("A descrição é obrigatória.")
        .isLength({ max: 200 })
        .withMessage("A descrição deve ter no máximo 200 caracteres."),
    check("qtd")
    .notEmpty()
    .withMessage("A quantidade é obrigatória.")
    .isInt({ min: 0, max: 999})
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
        .withMessage("Formato inválido. Use o padrão: AA-AAA-001."),
    check("descricao")
        .notEmpty()
        .withMessage("A descrição é obrigatória.")
        .isLength({ max: 200 })
        .withMessage("A descrição deve ter no máximo 200 caracteres."),
    check("qtd")
    .notEmpty()
    .withMessage("A quantidade é obrigatória.")
    .isInt({ min: 0, max: 999})
    .withMessage("A quantidade deve ser um número inteiro entre 0 e 999."),

    validateRequest
];