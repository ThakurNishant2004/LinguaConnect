import { Router } from 'express';
import { translate, detect } from '../controllers/translationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const r = Router();
r.use(authMiddleware);
r.post('/translate', translate);
r.post('/detect', detect);
export default r;
