'use client';

import InputMotion from "@/components/motion/InputsMotion";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useFormHandler } from "@/hooks/useFormHandler";
import { forgotPasswordService } from "@/services/auth/auth.service";
import { ForgotPasswordType } from "@/types/inputs/auth/auth.types";
import { ForgotPasswordValidation } from "@/validations/auth/ForgotAndResetPasswordValidations";
import FormField from "../FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { Send } from "lucide-react";

const ForgotPasswordForm = () => {

    const { register, formState, onSubmit, loading } = useFormHandler({
        schema: ForgotPasswordValidation,
        service: (data: ForgotPasswordType) => forgotPasswordService(data),
        onSuccess: (success) => console.log(success),
        onError: (err) => console.error(err),
    });

    return <>
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <InputMotion delay={0.2} isFullWidth>
                    <div className="flex flex-col lg:mb-4 gap-2 text-start">
                        <h1 className="text-2xl font-bold">Forgot Your Password ?</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            No worries! Enter your email address below and we'll send you a link to reset your password.
                        </p>
                    </div>
                </InputMotion>
                <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    description="Enter the email associated with your account and we'll send a reset link."
                    delay={0.3}
                    register={register}
                    error={formState.errors.email}
                />
                <InputMotion delay={0.4} isFullWidth>
                    <SubmitButton
                        title={loading ? 'Sending...' : 'Send Reset Link'}
                        isLoading={loading}
                        type="submit"
                        disabled={loading || !formState.isValid}
                        size={"lg"}
                        icon={<Send />}
                    />
                </InputMotion>
            </FieldGroup>
            <FieldDescription className="text-xs md:text-sm pt-2">
                Please check your spam or junk folder if you don't see the email in your inbox after a few minutes.
            </FieldDescription>
        </form>
    </>;
};

export default ForgotPasswordForm;