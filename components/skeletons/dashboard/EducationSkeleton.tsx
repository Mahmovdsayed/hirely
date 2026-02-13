import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const EducationCardSkeleton = () => {
    return (
        <Card className="overflow-hidden rounded-4xl">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-16 w-16 rounded-xl shrink-0" />

                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-7 w-3/4" />
                        <Skeleton className="h-5 w-1/2" />

                        <div className="flex flex-wrap gap-2 pt-1">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-28 rounded-full" />
                        </div>
                    </div>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="h-6 w-24 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full rounded-full" />
                <Skeleton className="h-10 w-full rounded-full" />
            </CardFooter>
        </Card>
    );
};

const EducationSkeleton = () => {
    return (
        <div className="py-8">
            <Separator className="mb-8" />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex items-baseline gap-2">
                        <Skeleton className="h-8 w-12" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
                <Skeleton className="h-10 w-40 rounded-full" />
            </div>
            <Separator className="mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, index) => (
                    <EducationCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default EducationSkeleton;
