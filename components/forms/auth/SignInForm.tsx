'use client';

import InputMotion from "@/components/motion/InputsMotion";
import SubmitButton from "@/components/ui/SubmitButton";
import { useFormHandler } from "@/hooks/useFormHandler";
import { signInService } from "@/services/auth/auth.service";
import { SignInType } from "@/types/inputs/auth/auth.types";
import { signInValidationSchema } from "@/validations/auth/signInValidation";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import FormField from "../FormField";
import { FieldGroup } from "@/components/ui/field";

const SignInForm = () => {
    const router = useRouter();

    const { register, formState, onSubmit, loading } = useFormHandler({
        schema: signInValidationSchema,
        service: (data: SignInType) => signInService(data),
        onSuccess: (success) => router.push('/dashboard'),
        onError: (err) => console.error(err),
    });

    return <>
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <InputMotion delay={0.1} isFullWidth>
                    <div className="flex flex-col lg:mb-4 gap-2 text-start">
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Login to your <strong>Hirely</strong> account to access your <br /> Dashboard and continue optimizing your portfolio
                        </p>
                    </div>
                </InputMotion>

                <FormField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    description="We'll use this to contact you. We will not share your email."
                    delay={0.2}
                    register={register}
                    error={formState.errors.email}
                />
                <div>
                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        description="Enter your strong password here, make sure it's at least 6 characters long."
                        delay={0.4}
                        register={register}
                        error={formState.errors.password}
                    />
                    <InputMotion delay={0.5} isFullWidth>
                        <div className="flex justify-end mt-2">
                            <button
                                type="button"
                                className="text-xs md:text-sm text-primary hover:underline"
                                onClick={() => router.push('/auth/forgot-password')}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </InputMotion>
                </div>
                <InputMotion delay={0.6} isFullWidth>
                    <SubmitButton
                        title="Sign In"
                        isLoading={loading}
                        icon={<LogIn />}
                        size={"lg"}
                        type="submit"
                        disabled={loading || !formState.isValid}
                    />
                </InputMotion>
                <div className="flex flex-col gap-2">
                    <InputMotion delay={0.8} isFullWidth>
                        <p className="text-xs text-start text-muted-foreground">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/auth/sign-up')}
                                className="text-primary font-semibold underline"
                            >
                                Sign Up
                            </button>
                             {" "},
                            <br />
                            {' '}Need to verify your email?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/auth/verify')}
                                className="text-primary font-semibold underline"
                            >
                                Verify Account
                            </button>
                        </p>
                    </InputMotion>
                    <InputMotion delay={1} isFullWidth>
                        <p className="text-xs text-start text-muted-foreground">
                            By signing in, you agree to our{' '}
                            <button
                                type="button"
                                className="text-primary font-medium underline"
                            >
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button
                                type="button"
                                className="text-primary font-medium underline"
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

export default SignInForm;