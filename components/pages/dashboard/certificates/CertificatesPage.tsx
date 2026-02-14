'use client';

import AddCertificateForm from "@/components/forms/dashboard/certificates/AddCertificateForm";
import StatsHeader from "@/components/layout/dashboard/StatsHeader";
import { Separator } from "@/components/ui/separator";
import { useAppQuery } from "@/hooks/useAppQuery";
import { useAppSelector } from "@/redux/hook";
import { getCertificatesService } from "@/services/dashboard/certificate.service";
import CertificatesCard from "./CertificatesCard";
import NotFoundDahboard from "@/components/layout/dashboard/NotFoundDahboard";
import { CertificateType } from "@/types/dashboard/certificate.types";
import CertificatesSkeleton from "@/components/skeletons/dashboard/CertificatesSkeleton";


const CertificatesPage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: certificatesData, isLoading, refetch } = useAppQuery({
        queryKey: ['certificates-dashboard', user?.id],
        queryFn: getCertificatesService,
        enabled: !!user?.id,
    });

    if (isLoading) return <CertificatesSkeleton />;

    return (
        <div className="py-10 space-y-10">
            <StatsHeader
                label="Total Certificates"
                count={certificatesData?.certificates?.length || 0}
                unit="certificates"
                emptyTitle="No certificates yet"
                emptyDescription="Add your professional certifications to validate your expertise and stand out to employers."
                tip={
                    <div className="flex items-center gap-1.5 font-medium text-xs text-primary bg-primary/10 w-fit px-3 py-1.5 rounded-full mt-3">
                        Tip: Include the issuing organization and credential ID for better visibility
                    </div>
                }
                action={<AddCertificateForm refetch={refetch} />}
            />

            <Separator className="opacity-50" />

            {certificatesData?.certificates?.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
                    {certificatesData?.certificates?.map((cert: CertificateType) => (
                        <CertificatesCard refetch={refetch} key={cert._id} certificate={cert} />
                    ))}
                </div>
            ) : (
                <NotFoundDahboard
                    content="No certifications found. Start by adding your most recent achievement!"
                />
            )}
        </div>
    );
};

export default CertificatesPage;