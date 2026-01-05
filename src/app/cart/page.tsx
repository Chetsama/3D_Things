'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon,
  LocalShipping,
  SupportAgent,
} from '@mui/icons-material';

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    name: '3D Printed Robot',
    price: 49.99,
    image: '/robot.jpg',
    quantity: 2,
    subtotal: 99.98,
  },
  {
    id: 2,
    name: 'Minimalist Vase',
    price: 24.99,
    image: '/vase.jpg',
    quantity: 1,
    subtotal: 24.99,
  },
  {
    id: 3,
    name: 'Mechanical Keychain',
    price: 15.99,
    image: '/keychain.jpg',
    quantity: 3,
    subtotal: 47.97,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity,
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleApplyCoupon = () => {
    // Simple coupon logic - in a real app this would be API call
    if (couponCode.toLowerCase() === 'save10') {
      alert('Coupon applied! 10% discount added.');
    } else {
      alert('Invalid coupon code');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Card elevation={3} sx={{ mt: 4, p: 4, textAlign: 'center' }}>
          <CartIcon sx={{ fontSize: 64, color: 'gray', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button variant="contained" href="/products" sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box display="flex" alignItems="center">
                          <CardMedia
                            component="img"
                            height="50"
                            image={item.image}
                            alt={item.name}
                            sx={{ mr: 2, borderRadius: '4px' }}
                          />
                          {item.name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${item.subtotal.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Coupon Code */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                Apply Coupon
              </Typography>
              <TextField
                label="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mr: 2 }}
              />
              <Button variant="contained" onClick={handleApplyCoupon}>
                Apply
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal</Typography>
                  <Typography>${getTotalPrice().toFixed(2)}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Shipping</Typography>
                  <Typography>$5.99</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Tax</Typography>
                  <Typography>
                    ${(getTotalPrice() * 0.08).toFixed(2)}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={3}
                  sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    $
                    {(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(
                      2
                    )}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
