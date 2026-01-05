import express from 'express';
import { getProducts, getProductById } from './products';
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './admin/products';
import { createCheckoutSession, handleStripeWebhook } from './checkout';

const router = express.Router();

// Public API endpoints for products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Admin API endpoints for products (requires authentication)
router.get('/admin/products', getAdminProducts);
router.post('/admin/products', createProduct);
router.put('/admin/products/:id', updateProduct);
router.delete('/admin/products/:id', deleteProduct);

// Checkout API endpoints
router.post('/checkout', createCheckoutSession);
router.post('/webhook/stripe', handleStripeWebhook);

export default router;
