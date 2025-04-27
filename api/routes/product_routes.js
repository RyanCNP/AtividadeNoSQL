import express from 'express';
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts
} from '../controllers/products_controller.js';
import { productValidationRules } from '../middleware/product_validation.js';
import validate from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', productValidationRules, validate, createProduct);
router.put('/:id', productValidationRules, validate, updateProduct);
router.delete('/:id', deleteProduct);

export default router;