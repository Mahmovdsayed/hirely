'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { editContactService } from "@/services/dashboard/contact.service";
import { SingleContactType } from "@/types/dashboard/contacts.types";
import { singleLinkValidationSchema } from "@/validations/dashboard/contact/contact.validation";
import { useEffect, useState } from "react";
import { FormDrawer } from "../../FormDrawer";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import FormSelect from "../../FormSelect";
import { allowedPlatforms } from "@/constants/statics";
import FormField from "../../FormField";

interface IProps {
    refetch: () => void
    contactId: string
    contact: SingleContactType
}
const UpdateContactsForm = ({ contactId, refetch, contact }: IProps) => {
    const [open, setOpen] = useState(false);

    const { register, formState, onSubmit, loading, reset } = useFormHandler<SingleContactType>({
        schema: singleLinkValidationSchema,
        service: (data: SingleContactType) => editContactService(contactId, data),
        onSuccess: () => {
            reset();
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
        defaultValues: {
            platform: contact.platform,
            url: contact.url,
        }
    });

    useEffect(() => {
        if (contact) {
            reset(contact);
        }
    }, [contact, reset]);

    return <>
        <FormDrawer
            title={`Edit ${contact.platform}`}
            loading={loading}
            description={`Edit your ${contact.platform} to boost your profile visibility and get AI insights`}
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
                        Contact Information
                    </h3>
                </div>
                <FormSelect
                    name="platform"
                    label="Platform"
                    register={register}
                    options={allowedPlatforms.map(platform => ({ value: platform, label: platform }))}
                    error={formState.errors.platform}
                    delay={0.1}
                    defaultValue={contact.platform}
                    description="Select the social media or professional platform."
                />
                <FormField
                    name="url"
                    label="Profile URL"
                    type="url"
                    placeholder="https://..."
                    description="Enter the full URL to your profile."
                    register={register}
                    defaultValue={contact.url}
                    error={formState.errors.url}
                    delay={0.15}
                />
            </form>
        </FormDrawer>
    </>;
};

export default UpdateContactsForm;