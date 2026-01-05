// Test file for admin products API endpoints
// These tests should fail initially before implementation

import request from 'supertest';
import app from '../../app';

describe('Admin Products API', () => {
  // This test should fail until we implement the endpoint
  it('should get all products (admin)', async () => {
    const response = await request(app).get('/api/admin/products').expect(200);

    expect(response.body).toBeDefined();
  });

  // This test should fail until we implement create product functionality
  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'A test product for validation',
      active: true,
    };

    const response = await request(app)
      .post('/api/admin/products')
      .send(newProduct)
      .expect(201);

    expect(response.body.name).toBe('Test Product');
  });
});
