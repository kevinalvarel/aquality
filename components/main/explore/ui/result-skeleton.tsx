import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultCardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="p-0">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
