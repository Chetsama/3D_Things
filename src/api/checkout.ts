import { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe with secret key (from environment)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as const,
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { items, customerEmail, shippingAddress } = req.body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing cart items' });
    }

    if (!customerEmail) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    // Calculate total amount from items
    let totalAmount = 0;
    const lineItems = [];

    for (const item of items) {
      const { productId, variantSelections, quantity } = item;

      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid product in cart' });
      }

      // For now, we'll just create a basic price structure
      const unitPrice = 29.99; // Placeholder - would fetch from database in real implementation

      totalAmount += unitPrice * quantity;

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Product ${productId}`, // Would be fetched properly
          },
          unit_amount: Math.round(unitPrice * 100), // Stripe expects cents
        },
        quantity,
      });
    }

    // Create checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would validate the webhook signature
    // and process the payment confirmation

    const event = req.body;

    // Handle different Stripe events
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded');
        // Process order creation here
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment failed');
        // Handle payment failure
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
};
