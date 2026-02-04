import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const VerifyAccountFormSkeleton = () => {
    return (
        <Card className="rounded-4xl shadow-none">
            <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                </div>

                <div className="flex justify-start items-center gap-2">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-11 rounded-md" />
                    ))}

                    <Skeleton className="h-4 w-4 rounded-full" />

                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-11 rounded-md" />
                    ))}
                </div>

                <Skeleton className="h-3 w-72" />
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-4 w-64" />
            </CardFooter>
        </Card>
    );
};

export default VerifyAccountFormSkeleton;
