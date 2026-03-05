import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send({ title: 'Get Cart Items' }));

router.post('/add', (req, res) => res.send({ title: 'Add Item to Cart' }));

router.put('/update/:id', (req, res) => res.send({ title: 'Update Cart Item' }));

router.delete('/remove/:id', (req, res) => res.send({ title: 'Remove Item from Cart' }));

router.delete('/clear', (req, res) => res.send({ title: 'Clear Cart' }));
export default router;