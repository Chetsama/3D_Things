import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Things - Ecommerce',
  description: 'Ecommerce platform for selling 3D printed models',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
