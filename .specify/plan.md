# 3D Things - Technical Implementation Plan

## Overview
This document outlines a technical implementation plan for the 3D Things ecommerce platform using Next.js frontend, Payload CMS backend, and Stripe payments integration.

## High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ──┬──┐
│   Frontend      │    │   Backend        │    │  │  Payload
│   (Next.js)     │────▶│   (Payload CMS)  │────┤  │  API
└─────────────────┘    └──────────────────┘    │  │
                                            │  │  Stripe
┌─────────────────┐    ┌──────────────────┐    │  │
│   Payment       │    │   Storage        │    │  │
│   (Stripe)      │────▶│   (S3/Azure Blob)│    │  │
└─────────────────┘    └──────────────────┘    ──┴──┘
```

## Key Collections and Relationships

### Products Collection
- `name`: string
- `description`: text
- `images`: upload field (linked to storage)
- `variants`: array of variant configurations  
- `active`: boolean
- `createdAt`, `updatedAt`

### Variants Collection
- `product`: relationship to Products collection
- `type`: enum (size, material, color)
- `values`: array of possible values for this variant type
- `priceAdjustment`: number (fixed amount added to base price)
- `leadTimeDays`: number (production lead time in days)

### Orders Collection  
- `customerEmail`: string
- `items`: array of order line items with:
  - `product`: relationship to Products collection
  - `variantSelections`: object mapping variant type to selected value
  - `quantity`: number
  - `unitPrice`: number (server-calculated)
  - `totalPrice`: number (server-calculated)
- `status`: enum (pending, processing, shipped, delivered, cancelled)
- `paymentStatus`: string (e.g., "paid", "failed")
- `paymentIntentId`: string (from Stripe)
- `shippingAddress`: object with address details
- `orderDate`, `createdAt`, `updatedAt`

### Order Line Item Structure
```typescript
{
  product: Product,
  variantSelections: {
    size: 'medium',
    material: 'PLA', 
    color: 'white'
  },
  quantity: number,
  unitPrice: number,
  totalPrice: number
}
```

## API Endpoints Required by Frontend

### Public Endpoints (No Auth Required)
- `GET /api/products` - List all active products with basic info
- `GET /api/products/:id` - Get single product details including variants  
- `POST /api/cart/add` - Add items to cart (client-side validation only)
- `POST /api/cart/update` - Update cart item quantities
- `POST /api/checkout` - Initiate checkout process with Stripe

### Admin Endpoints (Auth Required)
- `GET /api/admin/products` - List all products for admin dashboard
- `POST /api/admin/products` - Create new product  
- `PUT /api/admin/products/:id` - Update existing product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - List all orders with status details
- `GET /api/admin/orders/:id` - Get specific order details
- `PUT /api/admin/orders/:id/status` - Update order status

## Payment Flow Integration

### Stripe Checkout Process
1. Frontend calls `/api/checkout` endpoint
2. Backend creates Stripe PaymentIntent with:
   - Correct server-calculated prices (no client manipulation)
   - Product and variant details 
3. Stripe redirects to checkout page
4. After payment confirmation, Stripe webhook sent to backend
5. Backend validates webhook signature and idempotency
6. Order created in Payload CMS only after successful payment

### Webhook Handling
- All Stripe webhooks validated using webhook signing secret
- Idempotent processing with deduplication logic
- Only create/update orders based on verified webhooks  
- Handle `payment_intent.succeeded` and `payment_intent.payment_failed` events

## Pricing Logic Implementation

### Server-Side Validation
All pricing calculations happen in backend only:
1. Calculate base price from product
2. Apply variant price adjustments from variants collection
3. Sum all line items with quantities to get total
4. Validate calculated prices match client's cart submission (but never trust client)

### Price Calculation Example
```typescript
function calculateOrderTotal(items) {
  let total = 0;
  for (const item of items) {
    const product = getProductById(item.productId);
    const variantAdjustments = getVariantPriceAdjustments(item.variantSelections);
    
    // Server-side price validation - never trust client input
    const unitPrice = product.basePrice + sum(variantAdjustments);
    total += unitPrice * item.quantity;
  }
  return total;
}
```

## Deployment Considerations

### Infrastructure Requirements
- Node.js runtime for Payload CMS (v18+)
- PostgreSQL database with connection pooling  
- External storage service (S3-compatible or Azure Blob)
- Stripe account with webhook configuration
- Reverse proxy/load balancer for frontend

### Security Measures
- All admin endpoints require authentication tokens
- Webhook validation using Stripe signing secrets
- CORS policies configured appropriately
- Input sanitization and output encoding
- Environment variable management for secrets

### Scalability Considerations  
- Payload CMS optimized for read-heavy operations (products)
- Write operations (orders) handled with proper indexing 
- Database connection pooling for concurrent requests
- CDN for static assets from storage service
- Horizontal scaling of frontend components  

### Monitoring and Observability
- Error tracking for both frontend and backend
- Performance monitoring for API endpoints  
- Logging for all order status transitions
- Stripe webhook event tracking and retry logic

## Technology Stack Summary
- **Frontend**: Next.js (React-based, server-side rendering)
- **Backend**: Payload CMS (Node.js + TypeScript) 
- **Database**: PostgreSQL
- **Storage**: S3-compatible or Azure Blob Storage
- **Payment Processing**: Stripe Checkout with webhooks
- **Authentication**: JWT tokens for admin endpoints