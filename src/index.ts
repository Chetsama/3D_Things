import express from 'express';
import payload from 'payload';

// Load environment variables
require('dotenv').config();

const app = express();
app.use(express.json());

// Redirect root to admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload with minimal configuration for now
payload.init({
  secret: process.env.PAYLOAD_SECRET || 'my-secret-key',
  serverURL: process.env.PAYLOAD_SERVER_URL,
  db: require('@payloadcms/db-postgres').postgresDB({
    url: process.env.DATABASE_URI || 'postgresql://localhost:5432/3d_things',
  }),
  admin: {
    user: 'users',
  },
  collections: [
    // These are defined in the config file
  ],
})
  .then(async () => {
    console.log('Payload initialized successfully');
    
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Admin panel available at http://localhost:${port}/admin`);
    });
  })
  .catch((err) => {
    console.error('Error initializing Payload:', err);
    process.exit(1);
  });

export default app;