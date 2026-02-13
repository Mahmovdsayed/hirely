'use client';

import StatsHeader from "@/components/layout/dashboard/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { useAppQuery } from "@/hooks/useAppQuery";
import { useAppSelector } from "@/redux/hook";
import { getUserWorks } from "@/services/dashboard/work.service";
import WorksCard from "./WorksCard";
import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import AddWorksForm from "@/components/forms/dashboard/works/AddWorksForm";
import WorksSkeleton from "@/components/skeletons/dashboard/WorksSkeleton";

const WorksPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: works, isLoading, refetch } = useAppQuery({
        queryKey: ['works-dashboard', user?.id],
        queryFn: getUserWorks,
        enabled: !!user?.id,
    });

    if (isLoading) return <WorksSkeleton />;

    return <>
        <div className="py-8">
            <Separator className="mb-8" />
            <StatsHeader
                label="Total Works"
                count={works?.workCount}
                unit="added"
                emptyTitle="No works yet"
                emptyDescription="Add works to boost your profile visibility and get AI insights."
                tip={
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 w-fit px-2 py-1 rounded-full mt-2">
                        Tip: Ask AI to analyze your work experience
                    </div>
                }
                action={<AddWorksForm refetch={refetch} />}
            />
            <Separator className="mb-8" />

            {works?.workCount > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {works?.works?.map((work: any) => (
                        <WorksCard refetch={refetch} key={work._id} work={work} />
                    ))}
                </div>
            ) : (
                <NotFoundDahboard
                    content="No work experiences added yet. Click above to add some!"
                />
            )}

        </div>
    </>;
};

export default WorksPage;