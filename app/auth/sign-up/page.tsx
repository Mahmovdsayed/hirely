import SignUpPage from "@/components/pages/auth/signup/SignUpPage";

export const metadata = {
    title: "Sign Up",
    description: "Create an account to join the platform and start working or hiring freelancers",
    openGraph: {
        title: "Sign Up",
        description: "Create an account to join the platform and start working or hiring freelancers",
        siteName: "Hirely",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign Up",
        description: "Create an account to join the platform and start working or hiring freelancers",
    },
};

const page = () => {
    return <>
        <SignUpPage />
    </>;
};

export default page;