'use client';

import UpdateContactsForm from '@/components/forms/dashboard/contacts/UpdateContactsForm';
import DeleteButton from '@/components/forms/DeleteButton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { deleteContactService } from '@/services/dashboard/contact.service';
import { SingleContactType } from "@/types/dashboard/contacts.types";
import Link from 'next/link';

interface IProps {
    contact: SingleContactType
    refetch: () => void
}
const ContactsCard = ({ contact, refetch }: IProps) => {
    return <>
        <Card className="rounded-4xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold capitalize">{contact.platform}</h3>
                    <div className="flex items-center gap-2">
                        <UpdateContactsForm contactId={contact._id} refetch={refetch} contact={contact} />
                        <DeleteButton
                            isIcon={true}
                            title={`Delete ${contact.platform}`}
                            serviceFunc={() => deleteContactService(contact._id)}
                            refetch={refetch}
                            warningMessage={`Are you sure you want to delete ${contact.platform}? This action cannot be undone.`}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        <span className="text-foreground font-medium">Link:</span>{" "}
                        <Link
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline break-all"
                        >
                            {contact.platform}
                        </Link>
                    </p>
                </div>

            </CardContent>

        </Card>

    </>;
};

export default ContactsCard;