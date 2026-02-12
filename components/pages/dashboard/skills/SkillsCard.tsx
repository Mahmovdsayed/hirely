'use client'

import UpdateSkillsForm from "@/components/forms/dashboard/skills/UpdateSkillsForm";
import DeleteButton from "@/components/forms/DeleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDateLong } from "@/functions/FormatDate";
import { deleteSkillService } from "@/services/dashboard/skills.service";
import { SkillType } from "@/types/dashboard/skills.types";
import { Calendar, Edit, Trash } from "lucide-react";

interface IProps {
    skill: SkillType;
    refetch: () => void;
}
const SkillsCard = ({ skill, refetch }: IProps) => {
    return <>
        <Card className="rounded-4xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">{skill.name}</h3>
                    <div className="flex items-center gap-2">
                        <UpdateSkillsForm skillId={skill._id} refetch={refetch} data={skill} />
                        <DeleteButton 
                        isIcon={true}
                        title={`Delete ${skill.name}`}
                        serviceFunc={() => deleteSkillService(skill._id)}
                        refetch={refetch}
                        warningMessage={`Are you sure you want to delete ${skill.name}? This action cannot be undone.`}
                        />
                    </div>
                </div>
                <p className="text-sm text-muted-foreground capitalize"> <span className="text-foreground">Category:</span> {skill.category}</p>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="w-3 h-3" /> {formatDateLong(skill.updatedAt)}</p>
            </CardContent>
        </Card>

    </>;
};

export default SkillsCard;