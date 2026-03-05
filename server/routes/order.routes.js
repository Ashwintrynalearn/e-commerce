import { Router } from 'express';

const router = Router();

router.post('/create', (req, res) => res.send({ title: 'Create Order' }));

router.get('/my', (req, res) => res.send({ title: 'Get My Orders' }));

router.get('/orders', (req, res) => res.send({ title: 'Get All Orders' }));
router.get('/orders/:id', (req, res) => res.send({ title: 'Get Order By ID' }));
router.put('/orders/:id/status', (req, res) => res.send({ title: 'Update Order Status' }));

export default router;