'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editFAQService } from "@/services/dashboard/faq.service";
import { FAQTypes } from "@/types/dashboard/faq.types";
import { addFaqValidationSchema } from "@/validations/dashboard/faq/faq.validations";
import { useEffect, useState } from "react";
import { FormDrawer } from "../../FormDrawer";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import FormField from "../../FormField";
import FormTextarea from "../../FormTextarea";

interface IProps {
    faq: FAQTypes
    refetch: () => void
}

const EditFAQForm = ({ faq, refetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const { register, formState, onSubmit, loading, reset } = useFormHandler<FAQTypes>({
        schema: addFaqValidationSchema,
        service: (data: FAQTypes) => editFAQService(faq._id, data),
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
        defaultValues: {
            question: faq.question,
            answer: faq.answer
        }
    })

    useEffect(() => {
        if (faq) reset(faq);
    }, [faq, reset])

    return <>
        <FormDrawer
            title="Edit FAQ"
            loading={loading}
            description="Edit frequently asked questions to help recruiters understand your profile better."
            onSubmit={onSubmit}
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button variant="secondary" size="lg" className="w-full rounded-full">
                    <Edit className="w-4 h-4" /> Edit
                </Button>}
        >
            <form onSubmit={onSubmit}>
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Tip: Include questions about your experience, skills, and work preferences
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="question"
                            label="Question"
                            placeholder="e.g. What is your experience with React?"
                            register={register}
                            error={formState.errors.question}
                            delay={0.1}
                            description="Write a clear and concise question that recruiters might ask about your profile."
                        />
                        <FormTextarea
                            name="answer"
                            label="Answer"
                            placeholder="e.g. I have 3 years of experience working with React, building dynamic and responsive web applications."
                            register={register}
                            error={formState.errors.answer}
                            delay={0.2}
                            description="Provide a detailed answer to the question, highlighting your relevant experience and skills."
                        />
                    </FieldGroup>
                </div>
            </form>
        </FormDrawer>
    </>;
};

export default EditFAQForm;