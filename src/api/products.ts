import { Request, Response } from 'express';
import payload from 'payload';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await payload.find({
      collection: 'products',
      where: {
        active: {
          equals: true,
        },
      },
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Corrected the method call
    const product = await payload.findByID({
      collection: 'products',
      id,
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};