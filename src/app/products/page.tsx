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
  Chip,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
} from '@mui/material';
import {
  Star,
  FilterList,
  ShoppingBasket,
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
    description: 'Highly detailed 3D printed robot with moving parts',
  },
  {
    id: 2,
    name: 'Minimalist Vase',
    price: 24.99,
    image: '/vase.jpg',
    category: 'Home Decor',
    rating: 4.6,
    reviews: 89,
    description: 'Elegant vase perfect for any home',
  },
  {
    id: 3,
    name: 'Mechanical Keychain',
    price: 15.99,
    image: '/keychain.jpg',
    category: 'Accessories',
    rating: 4.7,
    reviews: 67,
    description: 'Functional keychain with moving gears',
  },
  {
    id: 4,
    name: 'Custom Phone Case',
    price: 19.99,
    image: '/phone-case.jpg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 203,
    description: 'Personalized phone case with unique design',
  },
  {
    id: 5,
    name: 'Geometric Sculpture',
    price: 39.99,
    image: '/sculpture.jpg',
    category: 'Art',
    rating: 4.9,
    reviews: 156,
    description: 'Modern geometric sculpture',
  },
  {
    id: 6,
    name: 'Space Rocket Model',
    price: 59.99,
    image: '/rocket.jpg',
    category: 'Model',
    rating: 4.7,
    reviews: 89,
    description: 'Detailed space rocket model',
  },
];

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = mockProducts.filter(
    (product) => filterCategory === 'all' || product.category === filterCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      {/* Filters and Sort */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            label="Category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ minWidth: 200 }}
        />
      </Stack>

      {/* Product Grid */}
      <Grid container spacing={3} mb={4}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                <Typography variant="h6">{product.name}</Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Chip
                    label={`${product.rating} ★`}
                    size="small"
                    icon={<Star />}
                    color="warning"
                  />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({product.reviews})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {product.description}
                </Typography>
                <Typography variant="h6">${product.price}</Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingBasket />}
                  sx={{ py: 1 }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
