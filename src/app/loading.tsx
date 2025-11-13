import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="py-6">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="grid gap-8">
            <Skeleton className="h-[550px] w-full rounded-lg" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </main>
      <footer className="py-6">
        <div className="container mx-auto flex justify-center">
            <Skeleton className="h-5 w-64" />
        </div>
      </footer>
    </div>
  );
}
