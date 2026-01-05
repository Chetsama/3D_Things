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
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  AccountCircle,
  Star,
  AddShoppingCart,
  LocalShipping,
  SupportAgent,
} from '@mui/icons-material';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: '3D Printed Robot',
    price: 49.99,
    image: '/robot.jpg',
    category: 'Robotics',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Minimalist Vase',
    price: 24.99,
    image: '/vase.jpg',
    category: 'Home Decor',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Mechanical Keychain',
    price: 15.99,
    image: '/keychain.jpg',
    category: 'Accessories',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 4,
    name: 'Custom Phone Case',
    price: 19.99,
    image: '/phone-case.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 203,
  },
];

// Mock data for stats
const statsData = [
  {
    title: 'Total Sales',
    value: '$12,450',
    change: '+12%',
    icon: <LocalShipping />,
  },
  { title: 'Orders', value: '142', change: '+8%', icon: <SupportAgent /> },
  {
    title: 'Customers',
    value: '3,124',
    change: '+5%',
    icon: <AccountCircle />,
  },
  { title: 'Products', value: '89', change: '+2%', icon: <AddShoppingCart /> },
];

export default function Dashboard() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header AppBar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            3D Things Store
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
            sx={{ mr: 2, width: 300 }}
          />

          <IconButton color="inherit">
            <Badge badgeContent={cartCount} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Avatar sx={{ ml: 2 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ px: 4, py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3} mb={4}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      p: 2,
                      mr: 2,
                      fontSize: '32px',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6">{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title} ({stat.change})
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {mockProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">{product.name}</Typography>
                    <Chip
                      label={`${product.rating} ★`}
                      size="small"
                      icon={<Star />}
                      color="warning"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}
                  >
                    <Typography variant="h6">${product.price}</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleAddToCart}
                      startIcon={<AddShoppingCart />}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
