'use client';

import AddFAQForm from "@/components/forms/dashboard/faq/AddFAQForm";
import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import StatsHeader from "@/components/layout/dashboard/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { useAppQuery } from "@/hooks/useAppQuery";
import { useAppSelector } from "@/redux/hook";
import { getUserFAQ } from "@/services/dashboard/faq.service";
import { FAQTypes } from "@/types/dashboard/faq.types";
import FAQCard from "./FAQCard";

const FAQPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: faqData, isLoading, refetch } = useAppQuery({
        queryKey: ['faq-dashboard', user?.id],
        queryFn: getUserFAQ,
        enabled: !!user?.id,
    });

    if (isLoading) return;

    return <>
        <div className="py-8">
            <Separator className="mb-8" />
            <StatsHeader
                label="Frequently Asked Questions"
                count={faqData?.faqCount || 0}
                unit="questions"
                emptyTitle="No FAQs added yet"
                emptyDescription="Add frequently asked questions to help recruiters understand your profile better."
                tip={
                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 w-fit px-2 py-1 rounded-full mt-2">
                        Tip: Include questions about your experience, skills, and work preferences
                    </div>
                }
                action={<AddFAQForm refetch={refetch} />}
            />

            <Separator className="mb-8" />

            {faqData?.faqCount > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {faqData?.faqs?.map((faq: FAQTypes) => (
                        <FAQCard refetch={refetch} key={faq._id} faq={faq} />
                    ))}
                </div>
            ) : (
                <NotFoundDahboard
                    content="No FAQs added yet. Start by adding your frequently asked questions!"
                />
            )}
        </div>
    </>;
};

export default FAQPage;