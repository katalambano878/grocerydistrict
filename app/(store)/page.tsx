import { getFeaturedCategories } from '@/lib/categories';
import HomePageClient from '@/components/HomePageClient';

export const revalidate = 60;

export default async function HomePage() {
  const categories = await getFeaturedCategories(4);
  return <HomePageClient initialCategories={categories} />;
}
