'use client';

import { FAQTypes } from "@/types/dashboard/faq.types";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DeleteButton from "@/components/forms/DeleteButton";
import { deleteFAQService } from "@/services/dashboard/faq.service";
import EditFAQForm from "@/components/forms/dashboard/faq/EditFAQForm";

interface IProps {
    faq: FAQTypes
    refetch: () => void
}

const FAQCard = ({ faq, refetch }: IProps) => {

    return <>
        <Card className="rounded-4xl shadow-none">
            <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
                <CardDescription>
                    {faq.answer}
                </CardDescription>
            </CardHeader>
            <CardFooter className="grid grid-cols-2 gap-2">
                <EditFAQForm faq={faq} refetch={refetch} />
                <DeleteButton
                    title="Delete FAQ"
                    serviceFunc={() => deleteFAQService(faq._id)}
                    refetch={refetch}
                    warningMessage={`Are you sure you want to delete this FAQ?`}
                    isIcon={false}
                />
            </CardFooter>

        </Card>
    </>;
};

export default FAQCard;