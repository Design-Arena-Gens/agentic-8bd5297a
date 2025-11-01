import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalized Learning Planner',
  description: 'Generate a daily learning schedule toward your goal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
