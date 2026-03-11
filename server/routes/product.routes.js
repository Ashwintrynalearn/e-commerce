import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import authorize from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);
router.post('/', authorize, createProduct);
router.put('/:id', authorize, updateProduct);
router.delete('/:id', authorize, deleteProduct);

export default router;
