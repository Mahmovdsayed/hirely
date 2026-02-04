'use client';

import { Button } from "@/components/ui/button";
import { useFormHandler } from "@/hooks/useFormHandler";
import { resendOtpCodeService } from "@/services/auth/auth.service";
import { ResendOtpCodeType } from "@/types/inputs/auth/auth.types";
import { resendOtpCodeValidationSchema } from "@/validations/auth/verifyValidation";
import { RefreshCwIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field";
import FormField from "../FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { useState } from "react";

interface IProps {
    email?: string;
}

const ResendOTP = ({ email }: IProps) => {
    const [open, setOpen] = useState(false);

    const { register, formState, onSubmit, loading } = useFormHandler({
        schema: resendOtpCodeValidationSchema,
        service: (data: ResendOtpCodeType) => resendOtpCodeService(data),
        onSuccess: () => setOpen(false),
        onError: (err) => console.error(err),
    });


    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="xs">
                    <RefreshCwIcon />
                    Resend Code
                </Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Resend OTP Code</DialogTitle>
                    <DialogDescription>
                        Resend the verification code to your email.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <form onSubmit={onSubmit}>
                        <FormField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="m@example.com"
                            autoComplete="email"
                            description="enter your email address to resend the OTP code."
                            delay={0}
                            register={register}
                            defaultValue={email}
                            error={formState.errors.email}
                            isMotionDisabled={true}
                        />
                        <DialogFooter className="mt-4">
                            <div className="flex w-full gap-2 flex-col-reverse justify-center items-center">
                                <DialogClose asChild>
                                    <Button className="w-full rounded-full" size={"lg"} variant="secondary">Cancel</Button>
                                </DialogClose>
                                <SubmitButton
                                    title={loading ? "Resending..." : "Resend Code"}
                                    isLoading={loading}
                                    type="submit"
                                    size={"lg"}
                                    disabled={loading || !formState.isValid}
                                    icon={<RefreshCwIcon />}
                                />
                            </div>
                        </DialogFooter>
                    </form>
                </FieldGroup>
            </DialogContent>

        </Dialog>
    </>;
};

export default ResendOTP;