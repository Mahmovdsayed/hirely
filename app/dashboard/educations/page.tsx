import TextHeader from "@/components/layout/dashboard/TextHeader";
import EducationPage from "@/components/pages/dashboard/education/EducationPage";

export const metadata = {
    title: "Education Management",
    description: "Here you can view and update your education history, manage your degrees, and ensure your academic information stays accurate and up to date. Changes made on this page affect how your profile appears across the platform."
};

const page = () => {
    return <>
        <TextHeader title={metadata.title} description={metadata.description} />
        <EducationPage />
    </>;
};

export default page;