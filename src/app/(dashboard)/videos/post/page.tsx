import { PostVideoContainer } from '@/features/videos/container/PostVideoContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post Video for Sale | Kollabary',
  description: 'List your high-quality UGC videos for sale and monetize your creative works.',
};

export default function PostVideoPage() {
  return <PostVideoContainer />;
}
