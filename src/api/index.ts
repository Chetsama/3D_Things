import express from 'express';
import { getProducts, getProductById } from './products';

const router = express.Router();

// Public API endpoints for products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

export default router;