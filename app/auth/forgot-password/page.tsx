import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm";

export const metadata = {
    title: "Forgot Password",
    description: "Reset your password by entering your email address to receive a reset link.",
    openGraph: {
        title: "Forgot Password",
        description: "Reset your password by entering your email address to receive a reset link.",
    },
    twitter: {
        card: "summary_large_image",
        title: "Forgot Password",
        description: "Reset your password by entering your email address to receive a reset link.",
    },
};

const page = () => {
    return <>
        <ForgotPasswordForm />
    </>;
};

export default page;