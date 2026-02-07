import TextHeader from "@/components/layout/dashboard/TextHeader";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
    return <>
        <TextHeader
            title="Profile Management"
            description="Here you can view and update your personal details, manage account preferences, control security settings, and ensure your information stays accurate and up to date. Changes made on this page affect how your profile appears across the platform and how the system communicates with you."
        />
        <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: User Info Form Skeleton */}
            <Card className="lg:col-span-8 p-6 rounded-4xl shadow-none bg-background flex flex-col gap-4">
                <Skeleton className="h-6 w-1/3 rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10 rounded-xl" />
                    <Skeleton className="h-10 rounded-xl" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
            </Card>

            {/* Right: Avatar Skeleton */}
            <Card className="lg:col-span-4 p-6 flex flex-col items-center justify-center rounded-4xl shadow-none bg-background">
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="h-10 w-24 rounded-xl" />
            </Card>
        </div>

        {/* Full width bottom section */}
        <Card className="w-full mt-6 p-6 rounded-4xl shadow-none bg-background">
            <Skeleton className="h-6 w-1/4 mb-2 rounded-xl" />
            <Skeleton className="h-4 w-full rounded-xl" />
            <Skeleton className="h-4 w-5/6 rounded-xl mt-2" />
        </Card>
    </>;
};

export default page;