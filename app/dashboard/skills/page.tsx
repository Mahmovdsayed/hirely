import TextHeader from "@/components/layout/dashboard/TextHeader";
import SkillsPage from "@/components/pages/dashboard/skills/SkillsPage";

export const metadata = {
    title: "Skills Management",
    description: "Here you can view and update your skills, manage your skills, and ensure your information stays accurate and up to date. Changes made on this page affect how your profile appears across the platform and how the system communicates with you.",
};

const page = () => {
    return <>
        <TextHeader
            title={metadata.title}
            description={metadata.description}
        />
        <SkillsPage />
    </>;
};

export default page;