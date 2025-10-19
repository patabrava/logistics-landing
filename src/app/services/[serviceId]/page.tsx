import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceDetailPage } from '@/components/sections/ServiceDetailPage';
import {
  SERVICE_DETAIL_IDS,
  getServiceDetails,
  isValidServiceId,
  type ServiceDetailId,
} from '@/data/serviceDetails';

interface ServicePageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export function generateStaticParams() {
  return SERVICE_DETAIL_IDS.map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { serviceId } = await params;

  if (!isValidServiceId(serviceId)) {
    return {
      title: 'Service nicht gefunden',
      description: 'Die angeforderte Leistung existiert nicht.',
    };
  }

  const details = getServiceDetails('de', serviceId) ?? getServiceDetails('en', serviceId);

  return {
    title: details ? `${details.title} | NavaTransport` : 'NavaTransport Logistik',
    description: details?.description ?? 'Professionelle Logistiklösungen von NavaTransport.',
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = await params;

  if (!isValidServiceId(serviceId)) {
    notFound();
  }

  return <ServiceDetailPage serviceId={serviceId as ServiceDetailId} />;
}
