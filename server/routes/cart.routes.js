import { Router } from 'express';
import { getCart, addItem, updateItem, removeItem, clearCart } from '../controllers/cart.controller.js';
const router = Router();

router.get('/', getCart);

router.post('/add', addItem );

router.put('/update/:id', updateItem);

router.delete('/remove/:id', removeItem);

router.delete('/clear', clearCart);
export default router;