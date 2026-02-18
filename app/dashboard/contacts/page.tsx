import TextHeader from "@/components/layout/dashboard/TextHeader";
import ContactsPage from "@/components/pages/dashboard/contacts/ContactsPage";

export const metadata = {
    title: "Contacts Management",
    description: "Manage your professional contacts and network connections in one place, Add, edit, or remove contact information to keep your profile up to date."
}

const page = () => {
    return <>
        <TextHeader
            title={metadata.title}
            description={metadata.description}
        />
        <ContactsPage />
    </>;
};

export default page;