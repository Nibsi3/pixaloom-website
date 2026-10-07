import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NicheServicePage } from '@/components/niche-service-page';
import { getRescueSpecialism, rescueSpecialisms } from '@/lib/niche-services';
import { pageMetadata } from '@/lib/site';

export function generateStaticParams() {
  return rescueSpecialisms.map(item => ({ slug: item.path.split('/').at(-1)! }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getRescueSpecialism(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: service.path });
}

export default async function RescueSpecialismPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getRescueSpecialism(slug);
  if (!service) notFound();
  return <NicheServicePage service={service} />;
}
