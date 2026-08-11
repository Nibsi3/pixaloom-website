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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
