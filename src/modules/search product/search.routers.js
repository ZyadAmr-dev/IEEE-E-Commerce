import express from 'express'
import { searchProducts } from './search.controllers.js'; 

const router = express.Router();

router.post('/search', searchProducts);

export default router;