import { Home } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Home />

          <h2 className="text-xl">Página inicial</h2>
        </div>

        <Skeleton className="size-10 rounded-md" />
      </header>

      <main className="w-full space-y-4 px-4 py-2 sm:py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-[132px]" />

          <Skeleton className="h-[132px]" />

          <Skeleton className="h-[132px]" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-[132px]" />

          <Skeleton className="h-[132px]" />

          <Skeleton className="h-[132px]" />
        </div>

        <Skeleton className="h-[362px]" />
      </main>
    </>
  );
}
