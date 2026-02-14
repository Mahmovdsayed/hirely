import TextHeader from "@/components/layout/dashboard/TextHeader";
import CertificatesPage from "@/components/pages/dashboard/certificates/CertificatesPage";

export const metadata = {
    title: "Certificates Management",
    description: "Showcase your professional certifications and licenses to validate your expertise and stand out to employers . Changes made here will be reflected on your public profile."
}

const page = () => {
    return <>
        <TextHeader
            title={metadata.title}
            description={metadata.description}
        />
        <CertificatesPage />
    </>;
};

export default page;