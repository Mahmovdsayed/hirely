import TextHeader from "@/components/layout/dashboard/TextHeader";
import ProfilePage from "@/components/pages/dashboard/profile/ProfilePage";

export const metadata = {
    title: "Profile Management",
    description: "Here you can view and update your personal details, manage account preferences, control security settings, and ensure your information stays accurate and up to date. Changes made on this page affect how your profile appears across the platform and how the system communicates with you.",
};

const page = () => {
    return <>
        <TextHeader
            title={metadata.title}
            description={metadata.description}
        />
        <ProfilePage />
    </>
}
export default page;