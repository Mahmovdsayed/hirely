'use client';

import { FieldGroup } from "@/components/ui/field";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";
import { useFormHandler } from "@/hooks/useFormHandler";
import { resetPasswordService } from "@/services/auth/auth.service";
import { ResetPasswordType } from "@/types/inputs/auth/auth.types";
import { resetPasswordValidationSchema } from "@/validations/auth/ForgotAndResetPasswordValidations";
import { useRouter } from "next/navigation";
import FormField from "../FormField";
import InputMotion from "@/components/motion/InputsMotion";
import SubmitButton from "@/components/ui/SubmitButton";
import { RectangleEllipsis } from "lucide-react";

interface IProps {
    email?: string;
    token?: string;
}

const ResetPasswordForm = ({ email, token }: IProps) => {
    const router = useRouter();

    const successFunction = () => {
        ConfettiFireworks();
        setTimeout(() => router.push(`/auth/sign-in`), 3000);
    }


    const { register, formState, onSubmit, loading } = useFormHandler({
        schema: resetPasswordValidationSchema,
        service: (data: ResetPasswordType) => resetPasswordService(data),
        onSuccess: () => successFunction(),
        onError: (err) => console.error(err),
    });

    return <>
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <InputMotion delay={0.2} isFullWidth>
                    <div className="flex flex-col lg:mb-4 gap-2 text-start">
                        <h1 className="text-2xl font-bold">Reset Your Password</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Please enter your new password below to reset your account password securely.
                        </p>
                    </div>
                </InputMotion>
                <input type="hidden" value={email} {...register("email")} />
                <input type="hidden" value={token} {...register("token")} />
                <FormField
                    name="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    description="Your new password must be at least 6 characters long."
                    delay={0.2}
                    register={register}
                    error={formState.errors.newPassword}
                />
                <FormField
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    description="Please re-enter your new password for confirmation."
                    delay={0.3}
                    register={register}
                    error={formState.errors.confirmPassword}
                />
                <InputMotion delay={0.4} isFullWidth>
                    <SubmitButton
                        title={loading ? 'Sending...' : 'Send Reset Link'}
                        isLoading={loading}
                        type="submit"
                        disabled={loading || !formState.isValid}
                        size={"lg"}
                        icon={<RectangleEllipsis />}
                    />
                </InputMotion>
            </FieldGroup>
        </form>
    </>;
};

export default ResetPasswordForm;