import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm';
import { Suspense } from 'react';

interface ResetPasswordPageProps {
    searchParams: Promise<{ token?: string, email?: string }>;
}

const page = async ({ searchParams }: ResetPasswordPageProps) => {
    const { token, email } = await searchParams;

    return <>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordForm email={email} token={token} />
        </Suspense>
    </>;
};

export default page;