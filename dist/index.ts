// Simple express server to test the setup
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: '3D Things ecommerce backend is running',
    status: 'success'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});