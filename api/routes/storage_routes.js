import express from 'express';
import {
    createStorage,
    updateStorage,
    deleteStorage,
    getStorageByProduct,
    getStorageList
} from '../controllers/storage_controller.js';
import { validadeteObjectId, validateStorageUpdate, validateStorage } from '../middleware/storage_validation.js';

const router = express.Router();

router.get('/', getStorageList);
router.get('/:cod_prod', validadeteObjectId, getStorageByProduct);
router.post('/', validateStorage, createStorage);
router.put('/:cod_prod', validadeteObjectId, validateStorageUpdate, updateStorage);
router.delete('/:cod_prod', validadeteObjectId, deleteStorage);

export default router;