'use client';

import { CertificateType } from "@/types/dashboard/certificate.types";
import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import { deleteCertificateService } from "@/services/dashboard/certificate.service";
import EditCertificateForm from "@/components/forms/dashboard/certificates/EditCertificateForm";
import { Card, CardFooter } from "@/components/ui/card";
import DeleteButton from "@/components/forms/DeleteButton";
import Link from "next/link";

interface IProps {
    certificate: CertificateType;
    refetch: () => void;
}

const CertificatesCard = ({ certificate, refetch }: IProps) => {

    const formatDateFull = (dateString?: string) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "MMMM dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    const details = certificate.courseDetails;

    return (
        <Card className="w-full border rounded-4xl p-6 flex flex-col gap-6">

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold wrap-break-word">
                    {certificate.name}
                </h3>

                <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-6 gap-1">
                    <span>Issuer: {certificate.issuer}</span>
                    <span>Type: {certificate.certificateType}</span>
                    <span>Status: {certificate.completionStatus}</span>
                </div>

                <div className="text-xs text-muted-foreground flex flex-col sm:flex-row sm:gap-6 gap-1">
                    <span>Issued: {formatDateFull(certificate.issueDate)}</span>
                    {details?.completionDate && (
                        <span>Completed: {formatDateFull(details.completionDate)}</span>
                    )}
                </div>
            </div>

            {/* Description */}
            {certificate.description && (
                <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {certificate.description}
                    </p>
                </div>
            )}

            {details && (
                <div className="border rounded-4xl p-4 flex flex-col gap-3">
                    <h4 className="text-sm font-medium">Course Details</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        {details.courseName && (
                            <div>
                                <span className="block text-xs">Course Name</span>
                                <span>{details.courseName}</span>
                            </div>
                        )}

                        {details.courseProvider && (
                            <div>
                                <span className="block text-xs">Provider</span>
                                <span>{details.courseProvider}</span>
                            </div>
                        )}

                        {details.instructor && (
                            <div>
                                <span className="block text-xs">Instructor</span>
                                <span>{details.instructor}</span>
                            </div>
                        )}

                        {details.duration && (
                            <div>
                                <span className="block text-xs">Duration</span>
                                <span>{details.duration} Hours</span>
                            </div>
                        )}

                        {details.courseLevel && (
                            <div>
                                <span className="block text-xs">Level</span>
                                <span>{details.courseLevel}</span>
                            </div>
                        )}
                    </div>

                    {details.courseUrl && (
                        <a
                            href={details.courseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm underline break-all"
                        >
                            View Course Source
                        </a>
                    )}
                </div>
            )}

            {certificate.skills && certificate.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="text-xs px-3 py-1 border rounded-full"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {(certificate.credentialId || certificate.credentialUrl) && (
                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                    {certificate.credentialId && (
                        <span className="border px-3 py-2 rounded-4xl break-all">
                            ID: {certificate.credentialId}
                        </span>
                    )}

                    {certificate.credentialUrl && (
                        <Link
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border px-3 py-2 rounded-4xl flex items-center gap-2 w-fit"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Verify Credential
                        </Link>
                    )}
                </div>
            )}

            <CardFooter className="grid grid-cols-2 gap-2">
                <EditCertificateForm certificate={certificate} refetch={refetch} />
                <DeleteButton
                    isIcon={false}
                    title={`Delete`}
                    serviceFunc={() => deleteCertificateService(certificate._id)}
                    refetch={refetch}
                    warningMessage={`Are you sure you want to delete ${certificate.name}? This action cannot be undone.`}
                />
            </CardFooter>


        </Card>
    );
};

export default CertificatesCard;
