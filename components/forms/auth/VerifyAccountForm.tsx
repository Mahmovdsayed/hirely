'use client';

import InputMotion from "@/components/motion/InputsMotion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import SubmitButton from "@/components/ui/SubmitButton";
import { LucideVerified } from "lucide-react";
import FormField from "../FormField";
import { verifyEmailOTPService } from "@/services/auth/auth.service";
import { VerifyEmailOTPType } from "@/types/inputs/auth/auth.types";
import { useFormHandler } from "@/hooks/useFormHandler";
import { verifyEmailValidationSchema } from "@/validations/auth/verifyValidation";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AlertWrapper from "@/components/ui/AlertWrapper";
import ResendOTP from "./ResendOTP";

interface IProps {
    email?: string;
}
const VerifyAccountForm = ({ email }: IProps) => {
    const router = useRouter();
    const [otp, setOtp] = useState("");

    const successFunction = () => {
        ConfettiFireworks();
        setTimeout(() => router.push(`/auth/sign-in`), 3000);
    }

    const { register, formState, onSubmit, loading, setValue } = useFormHandler({
        schema: verifyEmailValidationSchema,
        service: (data: VerifyEmailOTPType) => verifyEmailOTPService(data),
        onSuccess: () => successFunction(),
        onError: (err) => console.error(err),
    });

    useEffect(() => { if (email) setValue("email", email, { shouldValidate: true }) }, [email, setValue]);

    return <>
        <form onSubmit={onSubmit}>
            <FieldGroup>
                <InputMotion delay={0.2} isFullWidth>
                    <Card className="rounded-4xl shadow-none">
                        <CardHeader>
                            <CardTitle>Verify your account</CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                {email ?
                                    <span>A verification code of 6 digits has been sent to <strong>{email}</strong>. Please check your inbox and enter the code below to verify your account.</span> :
                                    <span>Please check your inbox and enter the verification code to verify your account.</span>
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="otp-verification">
                                        Verification code
                                    </FieldLabel>
                                    <ResendOTP email={email} />
                                </div>
                                {!email && <div className="mt-2 mb-1">
                                    <FormField
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="m@example.com"
                                        autoComplete="email"
                                        description="enter your email address to verify your account."
                                        delay={0}
                                        register={register}
                                        defaultValue={email}
                                        error={formState.errors.email}
                                        className="rounded-lg"
                                    />
                                </div>}
                                <InputOTP
                                    value={otp}
                                    onChange={(value) => {
                                        setOtp(value);
                                        setValue("otp", value, { shouldValidate: true });
                                    }}
                                    maxLength={6}
                                    id="otp-verification"
                                    required>
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator className="mx-2" />
                                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <FieldDescription>
                                    Enter the 6-digit code we sent to your email address.
                                </FieldDescription>
                                {formState.errors.otp && (
                                    <AlertWrapper errText={String(formState.errors.otp.message)} />
                                )}
                            </Field>
                            <input type="hidden" {...register("otp")} value={otp} />
                        </CardContent>
                        <CardFooter>
                            <Field>
                                <SubmitButton
                                    title={loading ? "Verifying..." : "Verify Account"}
                                    size="lg"
                                    type="submit"
                                    isLoading={loading}
                                    disabled={loading || !formState.isValid || otp.length !== 6}
                                    icon={<LucideVerified />}

                                />
                                <div className="text-muted-foreground text-xs md:text-sm">
                                    Didn't receive the code? Check your spam folder or{' '}
                                    <span className="font-semibold">resend the code.</span>
                                </div>
                            </Field>
                        </CardFooter>
                    </Card>
                </InputMotion>
            </FieldGroup>
        </form >

    </>;
};

export default VerifyAccountForm;