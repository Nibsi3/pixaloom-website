import type { Metadata } from 'next';
import './tailwind.css';

export const metadata: Metadata = {
  title: { absolute: 'Pixaloom Jokes' },
  robots: { index: false, follow: false },
};

export default function JokesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
