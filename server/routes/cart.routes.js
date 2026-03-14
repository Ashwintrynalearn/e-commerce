import { Router } from 'express';
import { getCart, addItem, updateItem, removeItem, clearCart } from '../controllers/cart.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authorize, getCart);

router.post('/add', authorize, addItem);

router.put('/update/:id', authorize, updateItem);

router.delete('/remove/:id', authorize, removeItem);

router.delete('/clear', authorize, clearCart);
export default router;