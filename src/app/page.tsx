'use client';

import { useState } from 'react';
import { Box, Typography, Button, Container, Paper, Chip } from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Star,
  LocalShipping,
  SupportAgent,
  AddShoppingCart,
  AccountCircle,
} from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to 3D Things Store
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Discover amazing 3D printed products for your home and hobbies
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/products"
          sx={{ mt: 3, px: 4, py: 1.5 }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Stats Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        mb={8}
      >
        <Paper
          elevation={3}
          sx={{ p: 3, width: { xs: '100%', sm: '200px' }, textAlign: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              p: 2,
              mr: 2,
              fontSize: '32px',
              display: 'inline-block',
            }}
          >
            <LocalShipping />
          </Box>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Fast Shipping
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Worldwide delivery in 3-5 business days
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{ p: 3, width: { xs: '100%', sm: '200px' }, textAlign: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              p: 2,
              mr: 2,
              fontSize: '32px',
              display: 'inline-block',
            }}
          >
            <SupportAgent />
          </Box>
          <Typography variant="h4" sx={{ mt: 1 }}>
            24/7 Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our experts are always ready to help you
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{ p: 3, width: { xs: '100%', sm: '200px' }, textAlign: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              p: 2,
              mr: 2,
              fontSize: '32px',
              display: 'inline-block',
            }}
          >
            <AccountCircle />
          </Box>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Quality Guarantee
          </Typography>
          <Typography variant="body2" color="text.secondary">
            30-day money back guarantee
          </Typography>
        </Paper>

        <Paper
          elevation={3}
          sx={{ p: 3, width: { xs: '100%', sm: '200px' }, textAlign: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '50%',
              p: 2,
              mr: 2,
              fontSize: '32px',
              display: 'inline-block',
            }}
          >
            <AddShoppingCart />
          </Box>
          <Typography variant="h4" sx={{ mt: 1 }}>
            Easy Returns
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Simple return process within 30 days
          </Typography>
        </Paper>
      </Box>

      {/* Featured Products */}
      <Box mb={8}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Featured Products
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          mt={2}
        >
          {[
            {
              id: 1,
              name: '3D Printed Robot',
              price: 49.99,
              rating: 4.8,
            },
            {
              id: 2,
              name: 'Minimalist Vase',
              price: 24.99,
              rating: 4.6,
            },
            {
              id: 3,
              name: 'Mechanical Keychain',
              price: 15.99,
              rating: 4.7,
            },
          ].map((product) => (
            <Paper
              key={product.id}
              elevation={3}
              sx={{
                p: 2,
                width: { xs: '100%', sm: '250px' },
                textAlign: 'center',
              }}
            >
              <Box
                component="img"
                src="/robot.jpg"
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <Typography variant="h6" mt={2}>
                {product.name}
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={1}
              >
                <Chip
                  label={`${product.rating} ★`}
                  size="small"
                  icon={<Star />}
                  color="warning"
                />
              </Box>
              <Typography variant="h6" mt={2}>
                ${product.price}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                href="/products"
              >
                View Details
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* CTA Section */}
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Join thousands of satisfied customers with our premium 3D printed
          products
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/products"
          sx={{ px: 4, py: 1.5 }}
        >
          Shop Now
        </Button>
      </Paper>
    </Container>
  );
}
