import express from 'express';
import filterProducts from './product.controllers.js'; 

const router = express.Router();

router.get('/products', filterProducts); 

export default router;
