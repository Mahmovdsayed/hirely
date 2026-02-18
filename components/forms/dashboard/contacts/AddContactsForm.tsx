'use client';

import { Button } from "@/components/ui/button";
import { useFormHandler } from "@/hooks/useFormHandler";
import { addContactService } from "@/services/dashboard/contact.service";
import { ContactsTypes } from "@/types/dashboard/contacts.types";
import { contactValidationSchema } from "@/validations/dashboard/contact/contact.validation";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormDrawer } from "../../FormDrawer";
import { FieldGroup } from "@/components/ui/field";
import FormField from "../../FormField";
import { allowedPlatforms } from "@/constants/statics";
import FormSelect from "../../FormSelect";
import { useFieldArray } from "react-hook-form";

interface IProps {
    refetch: () => void
}

const AddContactsForm = ({ refetch }: IProps) => {
    const [open, setOpen] = useState(false);

    const { register, control, formState, onSubmit, loading, reset } = useFormHandler<ContactsTypes>({
        schema: contactValidationSchema,
        service: (data: ContactsTypes) => addContactService(data),
        defaultValues: {
            socialLinks: [{ platform: '', url: '' }]
        },
        onSuccess: () => {
            reset();
            setOpen(false);
            refetch();
        },
        onError: (err) => console.error(err),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialLinks"
    });

    return <>
        <FormDrawer
            title="Add New Contact"
            loading={loading}
            description="Add your social links to boost your profile visibility."
            onSubmit={onSubmit}
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button variant="outline" size="lg" className="gap-2 rounded-4xl w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    Add New Contact
                </Button>
            }
        >
            <form onSubmit={onSubmit}>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Social Links
                        </h3>
                        <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => append({ platform: '', url: '', _id: '' })}
                            className="h-8 px-2 text-xs rounded-4xl"
                            disabled={fields.length >= 16}
                        >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Another Link
                        </Button>
                    </div>

                    <div className="space-y-8">
                        {fields.map((field, index) => (
                            <div key={field.id} className="relative p-4 border-none rounded-4xl bg-muted space-y-4">
                                {fields.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-card border-none"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                )}

                                <FieldGroup>
                                    <FormSelect
                                        name={`socialLinks.${index}.platform` as const}
                                        label="Platform"
                                        placeholder="Select the platform"
                                        register={register}
                                        options={allowedPlatforms.map(platform => ({ value: platform, label: platform }))}
                                        error={formState.errors.socialLinks?.[index]?.platform}
                                        delay={0.1}
                                        description="Select the platform."
                                    />
                                    <FormField
                                        name={`socialLinks.${index}.url` as const}
                                        label="Profile URL"
                                        type="url"
                                        placeholder="https://..."
                                        description="Enter the full URL."
                                        register={register}
                                        error={formState.errors.socialLinks?.[index]?.url}
                                        delay={0.15}
                                    />
                                </FieldGroup>
                            </div>
                        ))}
                    </div>

                    {formState.errors.socialLinks?.root && (
                        <p className="text-sm font-medium text-destructive">
                            {formState.errors.socialLinks.root.message}
                        </p>
                    )}

                    {formState.errors.socialLinks?.message && (
                        <p className="text-sm font-medium text-destructive text-center">
                            {formState.errors.socialLinks.message}
                        </p>
                    )}
                </div>
            </form>
        </FormDrawer>
    </>;
};

export default AddContactsForm;