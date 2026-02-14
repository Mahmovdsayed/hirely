'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { workType } from "@/types/dashboard/works.types";
import { MapPin, Briefcase, Calendar, Award, Target } from "lucide-react";
import DeleteButton from "@/components/forms/DeleteButton";
import { deleteWorkService } from "@/services/dashboard/work.service";
import EditWorksForm from "@/components/forms/dashboard/works/EditWorksForm";
import { calculateDuration } from "@/functions/calculateDuration";

interface IProps {
    work: workType
    refetch: () => void
}

const WorksCard = ({ work, refetch }: IProps) => {
    const formatDate = (date: string | Date | undefined) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <Card className="overflow-hidden rounded-4xl">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="h-16 w-16 rounded-xl shrink-0">
                        <AvatarImage
                            src={work.companyImage?.url}
                            alt={work.companyName}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded-xl text-xl font-bold">
                            {work.companyName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-1 leading-tight capitalize">
                            {work.position}
                        </h3>
                        <p className="text-base font-semibold text-muted-foreground mb-2 capitalize">
                            {work.companyName}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {work.employmentType}
                            </Badge>

                            <Badge variant="secondary" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {work.location}
                            </Badge>

                            <Badge variant="outline" className="text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(work.startDate)} - {work.isCurrent ? 'Present' : formatDate(work.endDate)}
                                <span className="mx-1">•</span>
                                {calculateDuration(work.startDate, work.endDate, work.isCurrent)}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <Separator />

            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-1 w-1 rounded-full bg-foreground" />
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            Description
                        </h4>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground capitalize">
                        {work.description}
                    </p>
                </div>

                {work.responsibilities && work.responsibilities.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                                <Target className="w-4 h-4 text-muted-foreground" />
                                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Key Responsibilities
                                </h4>
                            </div>
                            <ul className="space-y-2 ml-6">
                                {work.responsibilities.map((responsibility: string, index: number) => (
                                    <li
                                        key={index}
                                        className="text-sm text-foreground relative before:content-[''] before:absolute before:-left-4 before:top-[0.6rem] before:w-1.5 before:h-1.5 before:bg-muted-foreground before:rounded-full"
                                    >
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {work.achievements && work.achievements.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="w-4 h-4 text-muted-foreground" />
                                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Achievements
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {work.achievements.map((achievement: string, index: number) => (
                                    <div
                                        key={index}
                                        className="text-sm bg-secondary/50 border border-border px-4 py-2.5 rounded-3xl"
                                    >
                                        <span className="font-medium text-xs text-muted-foreground mr-2">
                                            #{index + 1}
                                        </span>
                                        {achievement}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {work.skills && work.skills.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-1 w-1 rounded-full bg-foreground" />
                                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                    Skills & Technologies
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {work.skills.map((skill: any, index: number) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs font-medium px-3 py-1"
                                    >
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <EditWorksForm work={work} refetch={refetch} />
                <DeleteButton
                    isIcon={false}
                    title={`Delete`}
                    serviceFunc={() => deleteWorkService(work._id)}
                    refetch={refetch}
                    warningMessage={`Are you sure you want to delete your experience at ${work.companyName}? This action cannot be undone.`}
                />
            </CardFooter>
        </Card>
    );
};

export default WorksCard;