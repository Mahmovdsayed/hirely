'use client'

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
    return <>
        <div className="w-full py-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div className="flex items-start gap-6">
                    <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
                    <div className="flex flex-col gap-2 pt-2">
                        <Skeleton className="h-7 w-48 rounded-lg" />
                        <Skeleton className="h-4 w-40 rounded-lg" />
                        <Skeleton className="h-4 w-32 rounded-lg" />
                    </div>
                </div>
                <Skeleton className="h-10 w-32 rounded-4xl" />
            </div>

            <Separator className="mb-8" />

            <section className="mb-8">
                <Skeleton className="h-4 w-16 mb-3 rounded-lg" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full max-w-xl rounded-lg" />
                    <Skeleton className="h-4 w-full max-w-lg rounded-lg" />
                    <Skeleton className="h-4 w-3/4 max-w-md rounded-lg" />
                </div>
            </section>

            <section className="mb-8">
                <Skeleton className="h-4 w-40 mb-4 rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-4xl bg-card border border-neutral-200 dark:border-neutral-800">
                            <Skeleton className="w-5 h-5 rounded" />
                            <div className="flex flex-col gap-1 flex-1">
                                <Skeleton className="h-3 w-16 rounded" />
                                <Skeleton className="h-5 w-24 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </>;
};

export default ProfileSkeleton;