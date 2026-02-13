'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editEducationService } from "@/services/dashboard/education.service";
import { educationValidationSchema, EducationValidationSchema } from "@/validations/dashboard/education/education.validation";
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
import { degreeTypes } from "@/constants/statics";
import { ImageCropper } from "@/components/ui/image-cropper";
import { ImageUpload } from "@/components/ui/image-upload";
import { compressImage } from "@/functions/compressImage";
import { Checkbox } from "@/components/ui/checkbox";
import { EducationType } from "@/types/dashboard/education.types";

interface IProps {
    education: EducationType;
    refetch: () => void;
}

const EditEducationForm = ({ education, refetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | undefined>();
    const [editingFileSrc, setEditingFileSrc] = useState<string | null>(null);

    const handleFileSelect = async (newFile?: File) => {
        if (!newFile) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setEditingFileSrc(reader.result as string);
        });
        reader.readAsDataURL(newFile);
    };

    const handleCropSave = async (croppedImage: File) => {
        setFile(croppedImage);
        setEditingFileSrc(null);
    };

    const serviceFunc = async (data: EducationValidationSchema) => {
        const formData = new FormData();

        formData.append("institution", data.institution);
        formData.append("degree", data.degree);
        formData.append("fieldOfStudy", data.fieldOfStudy);
        formData.append("isCurrent", String(!!data.isCurrent));
        formData.append("aiCounter", String(data.aiCounter || 0));

        if (data.location) formData.append("location", data.location);
        if (data.description) formData.append("description", data.description);
        if (data.grade) formData.append("grade", data.grade);
        if (data.gpa !== undefined) formData.append("gpa", String(data.gpa));

        if (data.startDate) formData.append("startDate", new Date(data.startDate).toISOString());
        if (data.endDate && !data.isCurrent) formData.append("endDate", new Date(data.endDate).toISOString());
        

        if (file) {
            const compressedFile = await compressImage(file, "square");
            if (compressedFile) formData.append("institutionImage", compressedFile);  
        }

        if (data.achievements && data.achievements.length > 0) data.achievements.forEach(achievement => formData.append("achievements", achievement));
        if (data.activities && data.activities.length > 0) data.activities.forEach(activity => formData.append("activities", activity));
        if (data.coursework && data.coursework.length > 0) data.coursework.forEach(course => formData.append("coursework", course));
        
        return editEducationService(education._id, formData);
    }

    const { register, formState, onSubmit, loading, reset, control, watch, setValue } = useFormHandler({
        schema: educationValidationSchema,
        service: serviceFunc,
        defaultValues: {
            institution: education.institution,
            degree: education.degree as any,
            fieldOfStudy: education.fieldOfStudy,
            location: education.location,
            description: education.description,
            isCurrent: education.isCurrent,
            startDate: education.startDate ? new Date(education.startDate) : undefined,
            endDate: education.endDate ? new Date(education.endDate) : undefined,
            grade: education.grade,
            gpa: education.gpa,
            activities: education.activities || [],
            achievements: education.achievements || [],
            coursework: education.coursework || [],
        },
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
    });

    const isCurrent = watch("isCurrent");

    useEffect(() => {
        if (isCurrent) {
            setValue("endDate", null);
        }
    }, [isCurrent, setValue]);

    return (
        <FormDrawer
            title="Edit Education"
            loading={loading}
            description="Update your academic background details"
            onSubmit={onSubmit}
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setEditingFileSrc(null);
                    setFile(undefined);
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
                        Institution Logo
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
                                    value={file || education.institutionImage?.url}
                                    onChange={handleFileSelect}
                                    onRemove={() => setFile(undefined)}
                                    rounded="rounded-2xl"
                                    className="aspect-square"
                                />
                                <p className="mt-3 text-xs text-center text-muted-foreground">
                                    Change logo (Optional)
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Education Details
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="institution"
                            label="Institution Name"
                            placeholder="e.g. Cairo University"
                            register={register}
                            error={formState.errors.institution}
                            delay={0.1}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormSelect
                                name="degree"
                                label="Degree"
                                register={register}
                                options={degreeTypes.map(type => ({ value: type, label: type }))}
                                error={formState.errors.degree}
                                delay={0.15}
                                defaultValue={education.degree}
                            />

                            <FormField
                                name="fieldOfStudy"
                                label="Field of Study"
                                placeholder="e.g. Computer Science"
                                register={register}
                                error={formState.errors.fieldOfStudy}
                                delay={0.2}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormDatePicker
                                name="startDate"
                                label="Start Date"
                                control={control}
                                error={formState.errors.startDate}
                                delay={0.25}
                            />
                            {!isCurrent && (
                                <FormDatePicker
                                    name="endDate"
                                    label="End Date"
                                    control={control}
                                    error={formState.errors.endDate}
                                    delay={0.3}
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-muted transition-colors hover:bg-muted/50">
                            <Checkbox
                                id="isCurrent_edu_edit"
                                checked={isCurrent}
                                onCheckedChange={(checked) => setValue("isCurrent", !!checked)}
                            />
                            <label
                                htmlFor="isCurrent_edu_edit"
                                className="text-sm font-medium leading-none cursor-pointer select-none"
                            >
                                I am currently studying here
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                name="grade"
                                label="Grade"
                                placeholder="e.g. Excellent / A+"
                                register={register}
                                error={formState.errors.grade}
                                delay={0.35}
                            />
                            <FormField
                                name="gpa"
                                label="GPA"
                                placeholder="e.g. 3.8 / 4.0"
                                register={register}
                                error={formState.errors.gpa}
                                delay={0.4}
                            />
                        </div>

                        <FormField
                            name="location"
                            label="Location"
                            placeholder="e.g. Cairo, Egypt"
                            register={register}
                            error={formState.errors.location}
                            delay={0.45}
                        />

                        <FormTextarea
                            name="description"
                            label="Description"
                            placeholder="Describe your studies, major projects, etc..."
                            register={register}
                            error={formState.errors.description}
                            delay={0.5}
                            rows={4}
                        />
                    </FieldGroup>
                </div>

                <div className="space-y-6 pt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Highlights & Activities
                    </h3>
                    <FieldGroup>
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="activities"
                            label="Social Activities / Clubs"
                            placeholder="e.g. Student Union, Football Team"
                            error={formState.errors.activities}
                            delay={0.55}
                        />
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="achievements"
                            label="Key Achievements"
                            placeholder="e.g. National Programming Contest Winner"
                            error={formState.errors.achievements}
                            delay={0.6}
                        />
                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="coursework"
                            label="Relevant Coursework"
                            placeholder="e.g. Data Structures, Algorithms"
                            error={formState.errors.coursework}
                            delay={0.65}
                        />
                    </FieldGroup>
                </div>
            </form>
        </FormDrawer>
    );
};

export default EditEducationForm;
