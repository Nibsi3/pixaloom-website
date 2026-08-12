import type { Metadata } from 'next';
import './tailwind.css';

export const metadata: Metadata = {
  title: { absolute: 'Pixaloom OS' },
  robots: { index: false, follow: false },
};

export default function OSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
