import TextHeader from "@/components/layout/dashboard/TextHeader";
import FAQPage from "@/components/pages/dashboard/faq/FAQPage";

export const metadata = {
    title: "Frequently Asked Questions",
    description: "Here you can manage your frequently asked questions (FAQs) to help recruiters understand your profile better. Add, edit, or delete FAQs to provide clear and concise information about your experience, skills, and work preferences. Changes made on this page will affect how your profile appears across the platform."
};

const page = () => {
    return <>
        <TextHeader title={metadata.title} description={metadata.description} />
        <FAQPage />
    </>;
};

export default page;