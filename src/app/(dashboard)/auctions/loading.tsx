import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionsLoading() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-10 w-64 bg-white/5" />
          <Skeleton className="h-4 w-96 bg-white/5 mt-2" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-12 flex-1 bg-white/5 rounded-xl" />
        <Skeleton className="h-12 w-24 bg-white/5 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  );
}
