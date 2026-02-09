'use client';

import { Button } from "@/components/ui/button";
import { ProfileType } from "@/types/dashboard/profile.types";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { FieldGroup } from "@/components/ui/field";
import { useFormHandler } from "@/hooks/useFormHandler";
import { editProfileValidationSchema } from "@/validations/dashboard/editProfileValidation";
import { updateProfile } from "@/services/dashboard/profile.service";
import FormField from "../FormField";
import FormSelect from "../FormSelect";
import FormDatePicker from "../FormDatePicker";
import FormTextarea from "../FormTextarea";
import { FormDrawer } from "../FormDrawer";

interface IProps {
    user: ProfileType;
    refetch: () => void;
}

const EditProfile = ({ user, refetch }: IProps) => {
    const [open, setOpen] = useState(false);

    const { register, formState, onSubmit, loading, control, reset } = useFormHandler({
        schema: editProfileValidationSchema,
        service: (data: ProfileType) => updateProfile(data),
        onSuccess: () => {
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            gender: user.gender,
            positionName: user.positionName,
            phone: user.phone,
            country: user.country,
            city: user.city,
            nationality: user.nationality,
            about: user.about,
        }
    });

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    return (
        <FormDrawer
            open={open}
            onOpenChange={setOpen}
            title="Edit Profile"
            description="Update your profile information to help others know you better."
            trigger={
                <Button variant="outline" size="lg" className="gap-2 rounded-4xl w-full sm:w-auto">
                    <Pencil className="w-4 h-4" />
                    Edit Profile
                </Button>
            }
            onSubmit={onSubmit}
            loading={loading}
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Personal Information
                    </h3>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="firstName"
                                label="First Name"
                                type="text"
                                placeholder="Enter your first name"
                                description="Your first name as it appears on official documents."
                                autoComplete="given-name"
                                register={register}
                                error={formState.errors.firstName}
                                delay={0.1}
                            />
                            <FormField
                                name="lastName"
                                label="Last Name"
                                type="text"
                                placeholder="Enter your last name"
                                description="Your family name or surname."
                                autoComplete="family-name"
                                register={register}
                                error={formState.errors.lastName}
                                delay={0.15}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormDatePicker
                                name="birthday"
                                label="Birthday"
                                description="Your date of birth helps personalize your experience."
                                control={control}
                                error={formState.errors.birthday}
                                delay={0.2}
                            />
                            <FormSelect
                                name="gender"
                                label="Gender"
                                description="How you identify yourself."
                                placeholder="Select gender"
                                options={[
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                ]}
                                register={register}
                                error={formState.errors.gender}
                                delay={0.2}
                            />
                        </div>
                    </FieldGroup>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Professional Details
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="positionName"
                            label="Position / Job Title"
                            type="text"
                            placeholder="e.g. Software Engineer, Product Designer"
                            description="Your current role or the position you're seeking."
                            autoComplete="organization-title"
                            register={register}
                            error={formState.errors.positionName}
                            delay={0.25}
                        />
                    </FieldGroup>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Location
                    </h3>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                name="city"
                                label="City"
                                type="text"
                                placeholder="Enter your city"
                                description="The city where you currently reside."
                                autoComplete="address-level2"
                                register={register}
                                error={formState.errors.city}
                                delay={0.3}
                            />
                            <FormField
                                name="country"
                                label="Country"
                                type="text"
                                placeholder="Enter your country"
                                description="Your country of residence."
                                autoComplete="country-name"
                                register={register}
                                error={formState.errors.country}
                                delay={0.35}
                            />
                        </div>
                        <FormField
                            name="nationality"
                            label="Nationality"
                            type="text"
                            placeholder="e.g. Egyptian, American"
                            description="Your citizenship or national identity."
                            register={register}
                            error={formState.errors.nationality}
                            delay={0.4}
                        />
                    </FieldGroup>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        About You
                    </h3>
                    <FieldGroup>
                        <FormTextarea
                            name="about"
                            label="Bio"
                            placeholder="Tell us about yourself, your skills, experiences, and what you're looking for..."
                            description="Write a short bio that highlights your expertise, achievements, and career goals."
                            register={register}
                            error={formState.errors.about}
                            delay={0.4}
                            rows={5}
                        />
                    </FieldGroup>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Contact
                    </h3>
                    <FieldGroup>
                        <FormField
                            name="phone"
                            label="Phone Number"
                            type="text"
                            placeholder="+20 123 456 7890"
                            description="Your phone number for direct contact. Include country code."
                            autoComplete="tel"
                            register={register}
                            error={formState.errors.phone}
                            delay={0.45}
                        />
                    </FieldGroup>
                </div>
            </form>
        </FormDrawer>
    );
};

export default EditProfile;