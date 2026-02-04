'use client';

import InputMotion from "@/components/motion/InputsMotion";
import { FieldGroup } from "@/components/ui/field";
import SubmitButton from "@/components/ui/SubmitButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import { signUpService } from "@/services/auth/auth.service";
import { SignUpType } from "@/types/inputs/auth/auth.types";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import FormField from "../FormField";
import { signUpValidationSchema } from "@/validations/auth/signUpValidation";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";

interface IProps {
    roleId: string;
}
const SignUpForm = ({ roleId }: IProps) => {
    const router = useRouter();

    const successFunction = (success: any) => {
        ConfettiFireworks();
        setTimeout(() => router.push(`/auth/verify?email=${success?.data?.email}`), 3000);
    }

    const { register, formState, onSubmit, loading } = useFormHandler({
        schema: signUpValidationSchema,
        service: (data: SignUpType) => signUpService(data),
        onSuccess: (success) => successFunction(success),
        onError: (err) => console.error(err),
    });

    return <>
        <form onSubmit={onSubmit} >
            <input type="hidden" value={roleId} {...register("role")} />
            <FieldGroup>
                {(roleId === 'freelancer' || roleId === 'client') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FormField
                            name="firstName"
                            label="First Name"
                            type="text"
                            placeholder="John"
                            autoComplete="name"
                            description="Enter your first name to create your account."
                            delay={0.2}
                            register={register}
                            error={formState.errors.firstName}
                        />
                        <FormField
                            name="lastName"
                            label="Last Name"
                            type="text"
                            placeholder="Doe"
                            autoComplete="name"
                            description="Enter your last name to create your account."
                            delay={0.3}
                            register={register}
                            error={formState.errors.lastName}
                        />
                    </div>
                )}

                {roleId === 'company' && (
                    <FormField
                        name="companyName"
                        label="Company Name"
                        type="text"
                        placeholder="Company Inc."
                        autoComplete="organization"
                        description="Enter your company name to create your account."
                        delay={0.4}
                        register={register}
                        error={formState.errors.companyName}
                    />
                )}

                <FormField
                    name="userName"
                    label="User Name"
                    type="text"
                    placeholder="john_doe"
                    autoComplete="username"
                    description="Choose a unique username for your profile."
                    delay={0.5}
                    register={register}
                    error={formState.errors.userName}
                />
                <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    description="Enter your email to create your account."
                    delay={0.6}
                    register={register}
                    error={formState.errors.email}
                />
                <FormField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    description="Enter your password to create your account."
                    delay={0.7}
                    register={register}
                    error={formState.errors.password}
                />



                <InputMotion delay={0.8} isFullWidth>
                    <SubmitButton
                        title={loading ? "Creating Account..." : "Sign Up"}
                        isLoading={loading}
                        icon={<LogIn />}
                        size={"lg"}
                        className="w-full"
                        type="submit"
                        disabled={loading || !formState.isValid}
                    />
                </InputMotion>
                <div className="flex flex-col gap-2">
                    <InputMotion delay={0.9} isFullWidth>
                        <p className="text-sm text-left text-muted-foreground">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/auth/sign-in')}
                                className="text-primary font-medium hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    </InputMotion>
                    <InputMotion delay={1} isFullWidth>
                        <p className="text-xs text-left text-muted-foreground">
                            By signing up, you agree to our{' '}
                            <button
                                type="button"
                                className="text-primary font-medium hover:underline"
                            >
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button
                                type="button"
                                className="text-primary font-medium hover:underline"
                            >
                                Privacy Policy
                            </button>.
                        </p>
                    </InputMotion>
                </div>

            </FieldGroup>
        </form>
    </>;
};

export default SignUpForm;