import SignInForm from "@/components/forms/auth/SignInForm";

export const metadata = {
    title: 'Sign In',
    description: 'Sign in to your Hirely account to access your dashboard and manage your portfolio effectively.',
    openGraph: {
        title: 'Sign In - Hirely',
        description: 'Sign in to your Hirely account to access your dashboard and manage your portfolio effectively.',
        url: '/auth/signin',
        siteName: 'Hirely',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        title: 'Sign In - Hirely',
        description: 'Sign in to your Hirely account to access your dashboard and manage your portfolio effectively.',
        card: 'summary_large_image',
        site: '@hirely',
        creator: '@hirely',
    },
};

const page = () => {
    return <>
        <SignInForm />
    </>;
};

export default page;