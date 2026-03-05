import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send({ title: 'Get All Products' }));

router.get('/:id', (req, res) => res.send({ title: 'Get Product By ID' }));
router.post('/products', (req, res) => res.send({ title: 'Add New Product' }));
router.put('/products/:id', (req, res) => res.send({ title: 'Update Product' }));
router.delete('/products/:id', (req, res) => res.send({ title: 'Delete Product' }));
export default router;
