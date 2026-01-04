# 3D_Things

A simple e-commerce website for selling 3D printed models.

## About

This project is a straightforward online store designed to showcase and sell 3D printed models. The website provides customers with an easy way to browse, view details, and purchase various 3D printed products.

## Features

- Product catalog displaying 3D printed models
- Detailed product pages with descriptions and images
- Shopping cart functionality
- Secure checkout process
- Responsive design for mobile and desktop viewing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 18 or higher) installed
- PostgreSQL database running locally or accessible
- npm package manager installed

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Chetsama/3D_Things.git
   cd 3D_Things
   ```

2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
    - Copy `.env.example` to `.env`
    - Update the database URI and other configuration values as needed

### Running the Application

1. Start the development server:
   ```
   npx ts-node src/index.ts
   ```

2. The application will be available at:
    - Server: http://localhost:3000

### Building for Production

To build the project for production deployment:
```
npm run build
```

### Note about Payload CMS

This project uses Payload CMS, but it appears to be configured with a basic Express server. The main application entry point is `src/index.ts` which runs on port 3000.

If you want to use Payload CMS features like the admin panel, you may need to:
1. Configure the proper Payload CMS configuration
2. Set up database migrations
3. Run additional setup commands

For more information about Payload CMS integration, please refer to the official documentation.

...
