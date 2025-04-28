const { body } = require('express-validator');

const productValidationRules = [

  //cod_produto nao pode ser nulo e não pode ser repetido.
  body('cod_produto')
  .notEmpty().withMessage('O código (cod_produto) é obrigatório')
  .custom(async (value) => {
    const existingProduct = await Products.findOne({ cod_produto: value });
    if (existingProduct) {
      throw new Error('Esse código já existe.');
    }
    return true;
  }),

  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .isString().withMessage('O tipo de dado precisa ser String'),

  body('price')
    .notEmpty().withMessage('Preço não pode ser vazio')
    .isNumeric().withMessage('O tipo de dado precisa ser numérico')
    .custom(value => value > 0).withMessage('O preço não pode ser menor do que 0.')
    ,

  body('description')
    .optional()
    .isString().withMessage('O tipo de dado da descrição precisa ser String'),

  body('category')
    .optional()
    .isString().withMessage('O tipo de dado da categoria precisa ser String')
];

module.exports = { productValidationRules };