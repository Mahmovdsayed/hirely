'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editCertificateService } from "@/services/dashboard/certificate.service";
import { certificateValidationSchema, CertificateValidationSchema } from "@/validations/dashboard/certificate/certificate.validation";
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
import { certificateTypes, completionStatuses, courseLevels } from "@/constants/statics";
import { CertificateType } from "@/types/dashboard/certificate.types";

interface IProps {
    certificate: CertificateType;
    refetch: () => void;
}

const EditCertificateForm = ({ certificate, refetch }: IProps) => {
    const [open, setOpen] = useState(false);

    const serviceFunc = async (data: CertificateValidationSchema) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("issuer", data.issuer);
        formData.append("description", data.description);
        formData.append("certificateType", data.certificateType);
        formData.append("completionStatus", data.completionStatus);

        if (data.issueDate) formData.append("issueDate", new Date(data.issueDate).toISOString());

        if (data.courseName) formData.append("courseName", data.courseName);
        if (data.courseProvider) formData.append("courseProvider", data.courseProvider);
        if (data.instructor) formData.append("instructor", data.instructor);
        if (data.duration !== undefined && data.duration !== null) formData.append("duration", String(data.duration));
        if (data.completionDate) formData.append("completionDate", new Date(data.completionDate).toISOString());
        if (data.courseUrl) formData.append("courseUrl", data.courseUrl);
        if (data.courseLevel) formData.append("courseLevel", data.courseLevel);

        if (data.credentialId) formData.append("credentialId", data.credentialId);
        if (data.credentialUrl) formData.append("credentialUrl", data.credentialUrl);

        if (data.skills && data.skills.length > 0) {
            data.skills.forEach(skill => formData.append("skills", skill));
        }

        return editCertificateService(certificate._id, formData);
    }

    const { register, formState, onSubmit, loading, reset, control, watch, setValue } = useFormHandler({
        schema: certificateValidationSchema,
        service: serviceFunc,
        defaultValues: {
            name: certificate.name,
            issuer: certificate.issuer,
            description: certificate.description,
            certificateType: certificate.certificateType as any,
            completionStatus: certificate.completionStatus as any,
            issueDate: certificate.issueDate ? new Date(certificate.issueDate) : undefined,
            courseName: certificate.courseDetails?.courseName,
            courseProvider: certificate.courseDetails?.courseProvider,
            instructor: certificate.courseDetails?.instructor,
            duration: certificate.courseDetails?.duration,
            completionDate: certificate.courseDetails?.completionDate ? new Date(certificate.courseDetails.completionDate) : undefined,
            courseUrl: certificate.courseDetails?.courseUrl,
            courseLevel: certificate.courseDetails?.courseLevel as any,
            credentialId: certificate.credentialId,
            credentialUrl: certificate.credentialUrl,
            skills: certificate.skills || [],
        },
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
    });

    const certificateType = watch("certificateType");

    useEffect(() => {
        if (certificate) {
            reset({
                name: certificate.name,
                issuer: certificate.issuer,
                description: certificate.description,
                certificateType: certificate.certificateType as any,
                completionStatus: certificate.completionStatus as any,
                issueDate: certificate.issueDate ? new Date(certificate.issueDate) : undefined,
                courseName: certificate.courseDetails?.courseName,
                courseProvider: certificate.courseDetails?.courseProvider,
                instructor: certificate.courseDetails?.instructor,
                duration: certificate.courseDetails?.duration,
                completionDate: certificate.courseDetails?.completionDate ? new Date(certificate.courseDetails.completionDate) : undefined,
                courseUrl: certificate.courseDetails?.courseUrl,
                courseLevel: certificate.courseDetails?.courseLevel as any,
                credentialId: certificate.credentialId,
                credentialUrl: certificate.credentialUrl,
                skills: certificate.skills || [],
            } as any);
        }
    }, [certificate, reset]);

    return (
        <FormDrawer
            title="Edit Certificate"
            loading={loading}
            description="Update your certificate or course completion details"
            onSubmit={onSubmit}
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
            }}
            trigger={
                <Button variant="secondary" size="lg" className="w-full rounded-full">
                    <Pencil className="w-4 h-4 mr-2" /> Edit
                </Button>
            }
        >
            <form onSubmit={onSubmit} className="space-y-8 pb-10">
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Basic Information
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="name"
                            label="Certificate Name"
                            placeholder="e.g. AWS Certified Solutions Architect"
                            register={register}
                            error={formState.errors.name}
                            delay={0.1}
                        />

                        <FormField
                            name="issuer"
                            label="Issuing Organization"
                            placeholder="e.g. Amazon Web Services, Coursera"
                            register={register}
                            error={formState.errors.issuer}
                            delay={0.15}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormSelect
                                name="certificateType"
                                label="Type"
                                register={register}
                                options={certificateTypes.map(type => ({ label: type.charAt(0).toUpperCase() + type.slice(1), value: type }))}
                                error={formState.errors.certificateType}
                                delay={0.2}
                                defaultValue={certificate.certificateType}
                            />

                            <FormSelect
                                name="completionStatus"
                                label="Status"
                                register={register}
                                options={completionStatuses.map(status => ({ label: status.charAt(0).toUpperCase() + status.slice(1), value: status }))}
                                error={formState.errors.completionStatus}
                                delay={0.25}
                                defaultValue={certificate.completionStatus}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <FormDatePicker
                                name="issueDate"
                                label="Date Issued"
                                control={control}
                                error={formState.errors.issueDate}
                                delay={0.3}
                            />
                        </div>
                    </FieldGroup>
                </div>

                {["course", "certification", "license"].includes(certificateType) && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Course Details
                        </h3>
                        <FieldGroup>
                            <FormField
                                name="courseName"
                                label="Course Name"
                                placeholder="e.g. Complete React Developer"
                                register={register}
                                error={formState.errors.courseName}
                                delay={0.1}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    name="courseProvider"
                                    label="Course Provider"
                                    placeholder="e.g. Coursera, Udemy"
                                    register={register}
                                    error={formState.errors.courseProvider}
                                    delay={0.12}
                                />
                                <FormField
                                    name="instructor"
                                    label="Instructor Name"
                                    placeholder="e.g. Dr. John Doe"
                                    register={register}
                                    error={formState.errors.instructor}
                                    delay={0.14}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormSelect
                                    name="courseLevel"
                                    label="Course Level"
                                    register={register}
                                    options={courseLevels.map(level => ({ label: level.charAt(0).toUpperCase() + level.slice(1), value: level }))}
                                    error={formState.errors.courseLevel}
                                    delay={0.15}
                                    defaultValue={certificate.courseDetails?.courseLevel}
                                />
                                <FormField
                                    name="duration"
                                    label="Duration (Hours)"
                                    type="number"
                                    placeholder="40"
                                    register={register}
                                    error={formState.errors.duration}
                                    delay={0.2}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormDatePicker
                                    name="completionDate"
                                    label="Completion Date"
                                    control={control}
                                    error={formState.errors.completionDate}
                                    delay={0.2}
                                />
                                <FormField
                                    name="courseUrl"
                                    label="Course URL"
                                    placeholder="https://coursera.org/..."
                                    register={register}
                                    error={formState.errors.courseUrl}
                                    delay={0.25}
                                />
                            </div>
                        </FieldGroup>
                    </div>
                )}

                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Credentials
                    </h3>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                name="credentialId"
                                label="Credential ID"
                                placeholder="e.g. CERT-123456"
                                register={register}
                                error={formState.errors.credentialId}
                                delay={0.1}
                            />
                            <FormField
                                name="credentialUrl"
                                label="Credential URL"
                                placeholder="https://..."
                                register={register}
                                error={formState.errors.credentialUrl}
                                delay={0.15}
                            />
                        </div>
                    </FieldGroup>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Description & Skills
                    </h3>
                    <FieldGroup>
                        <FormTextarea
                            name="description"
                            label="Description"
                            placeholder="What did you learn? What skills did you demonstrate?"
                            register={register}
                            error={formState.errors.description}
                            delay={0.4}
                            rows={4}
                        />

                        <FormMultiInput
                            control={control}
                            watch={watch}
                            setValue={setValue}
                            name="skills"
                            label="Skills Gained"
                            placeholder="e.g. Cloud Architecture, React Security"
                            error={formState.errors.skills}
                            delay={0.45}
                        />
                    </FieldGroup>
                </div>
            </form>
        </FormDrawer>
    );
};

export default EditCertificateForm;
