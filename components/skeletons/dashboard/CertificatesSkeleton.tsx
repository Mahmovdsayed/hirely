import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter } from "@/components/ui/card";

const CertificatesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 my-8">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="w-full border rounded-4xl p-6 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-7 w-3/4 mb-1" />

                        <div className="flex flex-col sm:flex-row sm:gap-6 gap-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-28" />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-6 gap-2 mt-1">
                            <Skeleton className="h-3 w-36" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <div className="space-y-1">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-11/12" />
                            <Skeleton className="h-3 w-4/5" />
                        </div>
                    </div>

                    {/* Details Box */}
                    <div className="border rounded-4xl p-4 flex flex-col gap-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-18" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="space-y-1">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-30" />
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-20 rounded-full" />
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <CardFooter className="grid grid-cols-2 gap-2 p-0 mt-auto">
                        <Skeleton className="h-12 w-full rounded-full" />
                        <Skeleton className="h-12 w-full rounded-full" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default CertificatesSkeleton;
