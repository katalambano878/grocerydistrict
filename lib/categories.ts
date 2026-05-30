import { supabase } from '@/lib/supabase';

export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  parent_id?: string | null;
  position?: number | null;
  metadata?: Record<string, unknown> | null;
  image_url?: string | null;
};

/** Fetch top-level active categories for homepage / nav (server or client). */
export async function getFeaturedCategories(limit = 4): Promise<CategoryRecord[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, parent_id, position, metadata, image_url')
    .eq('status', 'active')
    .is('parent_id', null)
    .order('position', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('[categories] fetch failed:', error.message);
    return [];
  }

  return data || [];
}
