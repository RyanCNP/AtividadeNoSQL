import express from 'express';
import {
    createStorage,
    updateStorage,
    deleteStorage,
    getStorageByProduct,
    getStorageList
} from '../controllers/storage_controller.js';
import { validateObjectId, validateStorageUpdate, validadetStorage } from '../middleware/storage_validation.js';

const router = express.Router();

router.get('/', getStorageList);
router.get('/:cod_prod', validateObjectId, getStorageByProduct);
router.post('/',validadetStorage, createStorage);
router.put('/:cod_prod', validateObjectId, validateStorageUpdate, updateStorage);
router.delete('/:cod_prod', validateObjectId, deleteStorage);

export default router;