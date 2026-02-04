import VerifyAccountForm from '@/components/forms/auth/VerifyAccountForm';
import VerifyAccountFormSkeleton from '@/components/skeletons/auth/VerifyAccountFormSkeleton';
import { Suspense } from 'react';


export const metadata = {
    title: "Verify Account",
    description: "Verify your account by entering the OTP code sent to your email address.",
    openGraph: {
        title: "Verify Account",
        description: "Verify your account by entering the OTP code sent to your email address.",
        siteName: "Hirely",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Verify Account",
        description: "Verify your account by entering the OTP code sent to your email address.",
    },
};

interface VerifyPageProps {
    searchParams: Promise<{ email?: string }>;
}



const page = async ({ searchParams }: VerifyPageProps) => {
    const { email } = await searchParams;
    return (
        <Suspense fallback={<VerifyAccountFormSkeleton />}>
            <VerifyAccountForm email={email} />
        </Suspense>
    );
}

export default page;