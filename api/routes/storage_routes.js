import express from 'express';
import {
    createStorage,
    updateStorage,
    deleteStorage,
    getStorageByProduct,
    getStorageList
} from '../controllers/storage_controller.js';
import { validadetObjectId, validateStorageUpdate, validatetStorage } from '../middleware/storage_validation.js';

const router = express.Router();

router.get('/', getStorageList);
router.get('/:cod_prod', validadetObjectId, getStorageByProduct);
router.post('/', validatetStorage, createStorage);
router.put('/:cod_prod', validadetObjectId, validateStorageUpdate, updateStorage);
router.delete('/:cod_prod', validadetObjectId, deleteStorage);

export default router;