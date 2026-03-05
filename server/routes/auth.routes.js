import { Router } from 'express';
import { signIn, register} from '../controllers/auth.controller.js';
const router = Router();

router.post('/register', register);

router.post('/signIn', signIn);

router.post('/logout', (req, res) => res.send({ title: 'Logout User' }));
export default router;
