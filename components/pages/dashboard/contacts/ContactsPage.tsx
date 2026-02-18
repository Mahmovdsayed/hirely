'use client';

import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import StatsHeader from "@/components/layout/dashboard/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { useAppQuery } from "@/hooks/useAppQuery";
import { useAppSelector } from "@/redux/hook";
import { getUserContacts } from "@/services/dashboard/contact.service";
import ContactsCard from "./ContactsCard";
import { SingleContactType } from "@/types/dashboard/contacts.types";
import AddContactsForm from "@/components/forms/dashboard/contacts/AddContactsForm";

const ContactsPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: contacts, isLoading, refetch } = useAppQuery({
        queryKey: ['contacts-dashboard', user?.id],
        queryFn: getUserContacts,
        enabled: !!user?.id,
    });

    if (isLoading) return
    console.log(contacts.socialLinks);

    return <>
        <div className="py-8">
            <Separator className="mb-8" />
            <StatsHeader
                label="Total Contacts"
                count={contacts?.socialLinks?.length}
                unit="added"
                emptyTitle="No contacts yet"
                emptyDescription="Add contacts to boost your profile visibility and get AI insights."
                tip={
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 w-fit px-2 py-1 rounded-full mt-2">
                        Tip: Add your LinkedIn to increase profile visibility
                    </div>
                }
                action={<AddContactsForm refetch={refetch} />}
            />
            <Separator className="mb-8" />
            {
                contacts?.socialLinks?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {contacts?.socialLinks?.map((contact: SingleContactType) => <ContactsCard refetch={refetch} key={contact._id} contact={contact} />)}
                    </div>
                ) : (
                    <NotFoundDahboard
                        content="No contact information added yet. Click above to add some!"
                    />
                )}
        </div>
    </>;
};

export default ContactsPage;