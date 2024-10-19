import express from 'express';
import * as cartController from './cart.controller.js';
import { tokenVerification } from '../../middlewares/verifyToken.middleware.js'; 
import { guard } from '../../middlewares/autherizedUser.middleware.js';

const router = express.Router();

router.use(tokenVerification);

router.get('/cart', guard.checkUser, cartController.getAllItems); 

router.post('/cart/:prodId', guard.checkUser, cartController.addItem); 

export default router;
