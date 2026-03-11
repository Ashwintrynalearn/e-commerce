import { Router } from 'express';

const router = Router();

router.post('/create', (req, res) => res.send({ title: 'Create Order' }));

router.get('/my', (req, res) => res.send({ title: 'Get My Orders' }));

router.get('/', (req, res) => res.send({ title: 'Get All Orders' }));
router.get('/:id', (req, res) => res.send({ title: 'Get Order By ID' }));
router.put('/:id/status', (req, res) => res.send({ title: 'Update Order Status' }));

export default router;