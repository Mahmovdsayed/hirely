import TextHeader from "@/components/layout/dashboard/TextHeader";
import WorksPage from "@/components/pages/dashboard/works/WorksPage";

export const metadata = {
    title: "Works Management",
    description: "Here you can view and update your works, manage your works, and ensure your information stays accurate and up to date. Changes made on this page affect how your profile appears across the platform and how the system communicates with you."
}

const page = () => {
    return <>
        <TextHeader
            title={metadata.title}
            description={metadata.description}
        />
        <WorksPage />
    </>;
};

export default page;