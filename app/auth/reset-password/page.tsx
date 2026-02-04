import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm';
import ResetPasswordFormSkeleton from '@/components/skeletons/auth/ResetPasswordFormSkeleton';
import { Suspense } from 'react';

export const metadata = {
    title: "Reset Password",
    description: "Reset your password by entering your email address to receive a reset link.",
    openGraph: {
        title: "Reset Password",
        description: "Reset your password by entering your email address to receive a reset link.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reset Password",
        description: "Reset your password by entering your email address to receive a reset link.",
    },
};

interface ResetPasswordPageProps {
    searchParams: Promise<{ token?: string, email?: string }>;
}

const page = async ({ searchParams }: ResetPasswordPageProps) => {
    const { token, email } = await searchParams;

    if (!(token || email)) return <p className="text-center text-sm md:text-base">
        Invalid password reset link. Please make sure you have the correct link from your email.
    </p>;


    return <>
        <Suspense fallback={<ResetPasswordFormSkeleton />}>
            <ResetPasswordForm email={email} token={token} />
        </Suspense>
    </>;
};

export default page;