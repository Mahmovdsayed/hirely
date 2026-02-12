'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editSkillService } from "@/services/dashboard/skills.service";
import { addSkillTypes } from "@/types/dashboard/skills.types";
import { addSkillsValidationSchema } from "@/validations/dashboard/skills/addSkillsValidation";
import { useEffect, useState } from "react";
import { FormDrawer } from "../../FormDrawer";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import FormField from "../../FormField";
import { FieldGroup } from "@/components/ui/field";

interface IProps {
    skillId: string;
    refetch: () => void;
    data: addSkillTypes;
}

const UpdateSkillsForm = ({ skillId, refetch, data }: IProps) => {
    const [open, setOpen] = useState(false);

    const { register, formState, onSubmit, loading, reset } = useFormHandler({
        schema: addSkillsValidationSchema,
        service: (data: addSkillTypes) => editSkillService(skillId, data),
        onSuccess: () => {
            reset();
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
        defaultValues: {
            name: data.name,
            category: data.category
        }
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    return <>
        <FormDrawer
            title={`Edit Skill ${data.name}`}
            loading={loading}
            description={`Edit your skill ${data.name} to boost your profile visibility and get AI insights`}
            onSubmit={onSubmit}
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button variant="secondary" size="icon-sm" className="rounded-full"><Edit /></Button>

            }
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Skill Information
                    </h3>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="name"
                                label="Skill Name"
                                type="text"
                                placeholder="Enter your skill name"
                                description="Enter the name of the skill you want to add."
                                autoComplete="skill-name"
                                register={register}
                                error={formState.errors.name}
                                delay={0.1}
                            />
                            <FormField
                                name="category"
                                label="Skill Category"
                                type="text"
                                placeholder="Enter your skill category"
                                description="Enter the category of the skill you want to add."
                                autoComplete="skill-category"
                                register={register}
                                error={formState.errors.category}
                                delay={0.15}
                            />
                        </div>
                    </FieldGroup>
                </div>

            </form>
        </FormDrawer >
    </>;
};
export default UpdateSkillsForm;
