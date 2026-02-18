'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editWorkService } from "@/services/dashboard/work.service";
import { workValidationSchema, WorkValidationSchema } from "@/validations/dashboard/works/work.validation";
import { useState, useEffect } from "react";
import { FormDrawer } from "../../FormDrawer";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import FormField from "../../FormField";
import FormDatePicker from "../../FormDatePicker";
import FormSelect from "../../FormSelect";
import FormTextarea from "../../FormTextarea";
import FormMultiInput from "../../FormMultiInput";
import { employmentTypes } from "@/constants/statics";
import { ImageCropper } from "@/components/ui/image-cropper";
import { ImageUpload } from "@/components/ui/image-upload";
import { compressImage } from "@/functions/compressImage";
import { Checkbox } from "@/components/ui/checkbox";
import { workType } from "@/types/dashboard/works.types";

interface IProps {
    work: workType;
    refetch: () => void;
}

const EditWorksForm = ({ work, refetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | undefined>();
    const [editingFileSrc, setEditingFileSrc] = useState<string | null>(null);
    const [isImageDeleted, setIsImageDeleted] = useState(false);

    const handleFileSelect = async (newFile?: File) => {
        if (!newFile) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setEditingFileSrc(reader.result as string);
        });
        reader.readAsDataURL(newFile);
        setIsImageDeleted(false);
    };

    const handleCropSave = async (croppedImage: File) => {
        setFile(croppedImage);
        setEditingFileSrc(null);
        setIsImageDeleted(false);
    };

    const serviceFunc = async (data: WorkValidationSchema) => {
        const formData = new FormData();

        formData.append("companyName", data.companyName);
        formData.append("position", data.position);
        formData.append("employmentType", data.employmentType || "Full-time");
        formData.append("location", data.location || "");
        formData.append("description", data.description);
        formData.append("isCurrent", String(!!data.isCurrent));
        formData.append("aiCounter", String(data.aiCounter || 0));

        if (data.startDate) formData.append("startDate", new Date(data.startDate).toISOString());
        if (data.endDate && !data.isCurrent) formData.append("endDate", new Date(data.endDate).toISOString());


        if (file) {
            const compressedFile = await compressImage(file, "square");
            if (compressedFile) formData.append("companyImage", compressedFile);
        } else if (isImageDeleted) formData.append("companyImage", "");

        if (data.skills && data.skills.length > 0) data.skills.forEach(skill => formData.append("skills", skill));
        if (data.achievements && data.achievements.length > 0) data.achievements.forEach(achievement => formData.append("achievements", achievement));
        if (data.responsibilities && data.responsibilities.length > 0) data.responsibilities.forEach(resp => formData.append("responsibilities", resp));

        return editWorkService(work._id, formData);
    }

    const { register, formState, onSubmit, loading, reset, control, watch, setValue } = useFormHandler({
        schema: workValidationSchema,
        service: serviceFunc,
        defaultValues: {
            companyName: work.companyName,
            position: work.position,
            employmentType: work.employmentType as any,
            location: work.location,
            description: work.description,
            isCurrent: work.isCurrent,
            startDate: work.startDate ? new Date(work.startDate) : undefined,
            endDate: work.endDate ? new Date(work.endDate) : undefined,
            skills: work.skills || [],
            achievements: work.achievements || [],
            responsibilities: work.responsibilities || [],
            aiCounter: work.aiCounter || 0,
        },
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
    });

    const isCurrent = watch("isCurrent");

    useEffect(() => {
        if (isCurrent) setValue("endDate", null);
    }, [isCurrent, setValue]);

    useEffect(() => {
        if (work) {
            reset({
                companyName: work.companyName,
                position: work.position,
                employmentType: work.employmentType as any,
                location: work.location,
                description: work.description,
                isCurrent: work.isCurrent,
                startDate: work.startDate ? new Date(work.startDate) : undefined,
                endDate: work.endDate ? new Date(work.endDate) : undefined,
                skills: work.skills || [],
                achievements: work.achievements || [],
                responsibilities: work.responsibilities || [],
                aiCounter: work.aiCounter || 0,
            } as any);
        }
    }, [work, reset]);

    return (
        <FormDrawer
            title="Edit Work Experience"
            loading={loading}
            description="Update your work experience details"
            onSubmit={onSubmit}
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setEditingFileSrc(null);
                    setFile(undefined);
                    setIsImageDeleted(false);
                }
            }}
            trigger={
                <Button variant="secondary" size="lg" className="w-full rounded-full">
                    <Pencil className="w-4 h-4" /> Edit
                </Button>
            }
        >
            <form onSubmit={onSubmit} className="space-y-8 pb-10">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Company Logo
                    </h3>
                    <div className="flex justify-center">
                        {editingFileSrc ? (
                            <ImageCropper
                                imageSrc={editingFileSrc}
                                onCropSave={handleCropSave}
                                onCancel={() => setEditingFileSrc(null)}
                            />
                        ) : (
                            <div className="w-full max-w-xs">
                                <ImageUpload
                                    value={file || (isImageDeleted ? undefined : work.companyImage?.url)}
                                    onChange={handleFileSelect}
                                    onRemove={() => {
                                        setFile(undefined);
                                        setIsImageDeleted(true);
                                    }}
                                    rounded="rounded-2xl"
                                    className="aspect-square"
                                />
                                <p className="mt-3 text-xs text-center text-muted-foreground">
                                    Change company logo (Optional)
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Primary Details
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="companyName"
                            label="Company Name"
                            placeholder="e.g. Google, Hirely"
                            register={register}
                            error={formState.errors.companyName}
                            delay={0.1}
                            description="The official name of the company."
                        />

                        <FormField
                            name="position"
                            label="Position"
                            placeholder="e.g. Senior Software Engineer"
                            register={register}
                            error={formState.errors.position}
                            delay={0.15}
                            description="Your job title at the company."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormSelect
                                name="employmentType"
                                label="Employment Type"
                                register={register}
                                options={employmentTypes.map(type => ({ label: type, value: type }))}
                                error={formState.errors.employmentType}
                                delay={0.2}
                                defaultValue={work.employmentType}
                                description="Type of your employment contract."
                            />

                            <FormField
                                name="location"
                                label="Location"
                                placeholder="e.g. Remote, Cairo, Egypt"
                                register={register}
                                error={formState.errors.location}
                                delay={0.25}
                                description="Geographical location of the workplace."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormDatePicker
                                name="startDate"
                                label="Start Date"
                                control={control}
                                error={formState.errors.startDate}
                                delay={0.3}
                                description="When you began working here."
                            />
                            {!isCurrent && (
                                <FormDatePicker
                                    name="endDate"
                                    label="End Date"
                                    control={control}
                                    error={formState.errors.endDate}
                                    delay={0.35}
                                    description="When you stopped working here."
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                            <Checkbox
                                id="isCurrent_edit"
                                checked={isCurrent}
                                onCheckedChange={(checked) => setValue("isCurrent", !!checked)}
                            />
                            <label
                                htmlFor="isCurrent_edit"
                                className="text-sm font-medium leading-none cursor-pointer select-none"
                            >
                                I am currently working in this role
                            </label>
                        </div>

                        <FormTextarea
                            name="description"
                            label="Description"
                            placeholder="Describe your responsibilities, key projects, and achievements..."
                            register={register}
                            error={formState.errors.description}
                            delay={0.4}
                            rows={5}
                            description="AI will use this description to help tailor your profile highlights."
                        />
                    </FieldGroup>
                </div>

                <div className="space-y-6 pt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Highlights & Skills
                    </h3>
                    <FieldGroup>
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="responsibilities"
                            label="Key Responsibilities"
                            placeholder="e.g. Developed high-performance APIs"
                            description="List your main duties in this role."
                            error={formState.errors.responsibilities}
                            delay={0.45}
                        />
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="achievements"
                            label="Key Achievements"
                            placeholder="e.g. Improved app performance by 40%"
                            description="Highlight your measurable wins."
                            error={formState.errors.achievements}
                            delay={0.5}
                        />
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="skills"
                            label="Relevant Skills"
                            placeholder="e.g. Next.js, Node.js"
                            description="Skills used or gained in this position."
                            error={formState.errors.skills}
                            delay={0.55}
                        />
                    </FieldGroup>
                </div>
            </form>
        </FormDrawer>
    );
};

export default EditWorksForm;
