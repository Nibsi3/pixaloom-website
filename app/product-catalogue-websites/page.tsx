import { NicheServicePage } from '@/components/niche-service-page';
import { catalogueService } from '@/lib/niche-services';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({ title: catalogueService.title, description: catalogueService.description, path: catalogueService.path });

export default function ProductCataloguePage() {
  return <NicheServicePage service={catalogueService} />;
}
