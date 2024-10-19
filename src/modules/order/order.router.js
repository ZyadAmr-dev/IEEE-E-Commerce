import express from 'express';
import * as orderController from './order.controller.js';
import { tokenVerification } from '../../middlewares/verifyToken.middleware.js'; 
import { guard } from '../../middlewares/autherizedUser.middleware.js';

const router = express.Router();

router.use(tokenVerification)

router.post('/cart/:prodId/payment', guard.checkUser, orderController.payItem)

router.post('/cart/payment', guard.checkUser, orderController.payCart)

export default router;
