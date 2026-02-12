'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";
import { getUserSkills } from "@/services/dashboard/skills.service";
import SkillsCard from "./SkillsCard";
import { SkillType } from "@/types/dashboard/skills.types";
import { useAppQuery } from "@/hooks/useAppQuery";
import SkillsSkeleton from "@/components/skeletons/dashboard/SkillsSkeleton";
import { Button } from "@/components/ui/button";
import { Bot, Check, Plus, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddSkillsForm from "@/components/forms/dashboard/skills/AddSkillsForm";
import SkillsAssistant from "../ai/SkillsAssistant";
import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import StatsHeader from "@/components/layout/dashboard/StatsHeader";

const SkillsPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: skills, isLoading, refetch } = useAppQuery({
        queryKey: ['skills-dashboard', user?.id],
        queryFn: getUserSkills,
        enabled: !!user?.id,
    });

    if (isLoading) return <SkillsSkeleton />;

    return (

        <div className="py-8">
            <Separator className="mb-8" />
            <StatsHeader
                label="Total Skills"
                count={skills?.skillCount}
                unit="added"
                emptyTitle="No skills yet"
                emptyDescription="Add skills to boost your profile visibility and get AI insights."
                tip={
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 w-fit px-2 py-1 rounded-full mt-2">
                        Tip: Ask AI to analyze your skill set
                    </div>
                }
                action={<AddSkillsForm refetch={refetch} />}
            />
            <Separator className="mb-8" />
            {skills?.skillCount > 0 ?
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {skills?.skills?.map((skill: SkillType) => (
                            <SkillsCard refetch={refetch} key={skill._id} skill={skill} />
                        ))}
                    </div>
                    <Separator className="my-8" />
                    <SkillsAssistant />
                </>
                : (
                    <NotFoundDahboard
                        content="No skills added yet. Click above to add some!"
                    />
                )}
        </div>
    );
};

export default SkillsPage;