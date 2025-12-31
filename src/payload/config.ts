import { buildConfig } from 'payload/config';
import { postgresDB } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';

// Import collections 
import Products from './collections/Products';
import Variants from './collections/Variants';
import Orders from './collections/Orders';

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL,
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  collections: [
    Products,
    Variants,
    Orders,
  ],
  db: postgresDB({
    url: process.env.DATABASE_URI || '',
  }),
  typescript: {
    outputFile: 'payload-types.ts',
  },
  graphQL: {
    schemaOutputFile: 'generated-schema.graphql',
  },
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
    'http://localhost:3000',
  ],
});