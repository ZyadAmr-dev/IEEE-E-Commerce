import express from 'express';
import * as adminController from './admin.controller.js';
import { tokenVerification } from '../../middlewares/verifyToken.middleware.js'; 
import { guard } from '../../middlewares/autherizedAdmin.middleware.js';

const router = express.Router();

router.use(tokenVerification);

router.post('/product', guard.checkAdmin, adminController.createProduct); 

router.put('/product/:prodId', guard.checkAdmin, adminController.updateProduct);

router.get('/products', guard.checkAdmin, adminController.getAllProducts);

router.delete('/product/:prodId', guard.checkAdmin, adminController.deleteProduct);

export default router;
