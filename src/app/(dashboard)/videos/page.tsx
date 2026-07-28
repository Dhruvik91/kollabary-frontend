import { VideosContainer } from '@/features/videos/container/VideosContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Videos for Sale | Kollabary',
  description: 'Browse, filter, and buy creative UGC videos listed by top creators, or upload your own work.',
};

export default function VideosPage() {
  return <VideosContainer />;
}
