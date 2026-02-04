'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const ResetPasswordFormSkeleton = () => {
    return (
        <Card className="w-full shadow-none border-none">
            <CardContent className="space-y-6 p-0">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full max-w-sm" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                    <Skeleton className="h-3 w-64" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                    <Skeleton className="h-3 w-72" />
                </div>

                <Skeleton className="h-12 w-full rounded-2xl" />
            </CardContent>
        </Card>
    );
};

export default ResetPasswordFormSkeleton;
