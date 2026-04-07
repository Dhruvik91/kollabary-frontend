'use client';

import { FileQuestion } from 'lucide-react';
import { BackButton } from '@/components/shared/BackButton';

export default function AuctionsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="bg-white/5 p-6 rounded-full mb-6 text-gray-500">
        <FileQuestion className="h-12 w-12" />
      </div>
      <h2 className="text-3xl font-bold text-white">404 - Not Found</h2>
      <p className="text-gray-400 mt-2 max-w-md mx-auto">
        The auction or page you're looking for doesn't exist.
      </p>
      <BackButton label="Back to Auctions" />
    </div>
  );
}
