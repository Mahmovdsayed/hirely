'use client';

import StatsHeader from "@/components/layout/dashboard/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { useAppQuery } from "@/hooks/useAppQuery";
import { useAppSelector } from "@/redux/hook";
import { getUserEducations } from "@/services/dashboard/education.service";
import EducationCard from "./EducationCard";
import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import AddEducationForm from "@/components/forms/dashboard/education/AddEducationForm";
import EducationSkeleton from "@/components/skeletons/dashboard/EducationSkeleton";

const EducationPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: educationData, isLoading, refetch } = useAppQuery({
        queryKey: ['education-dashboard', user?.id],
        queryFn: getUserEducations,
        enabled: !!user?.id,
    });
    console.log(educationData)

    if (isLoading) return <EducationSkeleton />;

    return (
        <div className="py-8">
            <Separator className="mb-8" />
            <StatsHeader
                label="Total Qualifications"
                count={educationData?.educationCount || 0}
                unit="degrees"
                emptyTitle="No education history yet"
                emptyDescription="Add your education to show your academic achievements to recruiters."
                tip={
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 w-fit px-2 py-1 rounded-full mt-2">
                        Tip: Include your latest degree and any relevant certifications
                    </div>
                }
                action={<AddEducationForm refetch={refetch} />}
            />
            <Separator className="mb-8" />

            {educationData?.educationCount > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {educationData?.educations?.map((edu: any) => (
                        <EducationCard refetch={refetch} key={edu._id} education={edu} />
                    ))}
                </div>
            ) : (
                <NotFoundDahboard
                    content="No academic records found. Start by adding your latest qualification!"
                />
            )}
        </div>
    );
};

export default EducationPage;
