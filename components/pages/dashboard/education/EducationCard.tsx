'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EducationType } from "@/types/dashboard/education.types";
import { MapPin, GraduationCap, Calendar, Award, BookOpen, Users } from "lucide-react";
import DeleteButton from "@/components/forms/DeleteButton";
import { deleteEducationService } from "@/services/dashboard/education.service";
import EditEducationForm from "@/components/forms/dashboard/education/EditEducationForm";

interface IProps {
    education: EducationType
    refetch: () => void
}

const EducationCard = ({ education, refetch }: IProps) => {
    const formatDate = (date: string) => {
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
                            src={education.institutionImage?.url}
                            alt={education.institution}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded-xl text-xl font-bold">
                            {education.institution.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-1 leading-tight capitalize">
                            {education.degree} in {education.fieldOfStudy}
                        </h3>
                        <p className="text-base font-semibold text-muted-foreground mb-2 capitalize">
                            {education.institution}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                                <GraduationCap className="w-3 h-3 mr-1" />
                                {education.degree}
                            </Badge>

                            {education.location && (
                                <Badge variant="secondary" className="text-xs">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {education.location}
                                </Badge>
                            )}

                            <Badge variant="outline" className="text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(education.startDate)} - {education.isCurrent ? 'Present' : formatDate(education.endDate!)}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-6 pt-6">
                {(education.grade || education.gpa) && (
                    <div className="grid grid-cols-2 gap-4">
                        {education.grade && (
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grade</p>
                                <p className="text-sm font-bold text-primary">{education.grade}</p>
                            </div>
                        )}
                        {education.gpa && (
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GPA</p>
                                <p className="text-sm font-bold text-primary">{education.gpa}</p>
                            </div>
                        )}
                    </div>
                )}
                <Separator />
                {education.description && (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-1 w-1 rounded-full bg-foreground" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">
                            {education.description}
                        </p>
                    </div>
                )}
                <Separator />
                {education.activities && education.activities.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Activities & Societies</h4>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {education.activities.map((activity, index) => (
                                <li key={index} className="text-sm px-3 py-1 bg-secondary/30 rounded-full border border-border">
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Separator />
                {education.achievements && education.achievements.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-muted-foreground" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Achievements</h4>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {education.achievements.map((achievement, index) => (
                                <li key={index} className="text-sm px-3 py-1 bg-primary/5 text-primary rounded-3xl border border-primary/20">
                                    {achievement}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Separator />
                {education.coursework && education.coursework.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-muted-foreground" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Relevant Coursework</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {education.coursework.map((course, index) => (
                                <Badge key={index} variant="outline" className="text-xs font-medium">
                                    {course}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-2">
                <EditEducationForm education={education} refetch={refetch} />
                <DeleteButton
                    isIcon={false}
                    title={`Delete`}
                    serviceFunc={() => deleteEducationService(education._id)}
                    refetch={refetch}
                    warningMessage={`Are you sure you want to delete your education record from ${education.institution}?`}
                />
            </CardFooter>
        </Card>
    );
};

export default EducationCard;
