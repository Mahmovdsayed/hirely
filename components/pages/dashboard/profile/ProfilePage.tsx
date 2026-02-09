'use client'

import ProfileSkeleton from "@/components/skeletons/dashboard/ProfileSkeleton";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hook";
import { getUserProfile } from "@/services/dashboard/profile.service";
import { ProfileType } from "@/types/dashboard/profile.types";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Calendar, Globe, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import InfoCard from "./InfoCard";
import EditProfile from "@/components/forms/dashboard/profile/EditProfile";
import InputMotion from "@/components/motion/InputsMotion";
import { formatDateLong } from "@/functions/FormatDate";
import UpdateAvatar from "@/components/forms/dashboard/profile/UpdateAvatar";

const ProfilePage = () => {
    const user = useAppSelector((state) => state.user);

    const { data: profile, isLoading, refetch } = useQuery<ProfileType>({
        queryKey: ['profile-dashboard', user?.id],
        queryFn: getUserProfile,
        staleTime: 0,
        refetchInterval: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
    });

    if (!profile && isLoading) return <ProfileSkeleton />;

    return (
        <div className="w-full py-8">
            <InputMotion delay={0.1} isFullWidth>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="border-4 border-neutral-200 dark:border-neutral-800 relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                                <Image
                                    src={profile?.avatar?.url || "/images/default-avatar.png"}
                                    alt={`${profile?.firstName} ${profile?.lastName}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <UpdateAvatar refetch={refetch} currentAvatar={profile?.avatar?.url || ""} />
                        </div>

                        <div className="flex flex-col gap-1 pt-2">
                            <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                                {profile?.firstName} {profile?.lastName}
                            </h1>
                            <p className="text-sm text-muted-foreground font-medium">
                                {user?.email}
                            </p>
                            {profile?.positionName && (
                                <p className="text-sm text-muted-foreground font-semibold">
                                    {profile?.positionName}
                                </p>
                            )}
                        </div>
                    </div>
                    <EditProfile user={profile!} refetch={refetch} />
                </div>
            </InputMotion>

            <InputMotion delay={0.2} isFullWidth>
                <Separator className="mb-8" />
            </InputMotion>

            <section className="mb-8">
                <InputMotion delay={0.3} isFullWidth>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        About
                    </h2>
                    {profile?.about ? (
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-6xl">
                            {profile.about}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No bio added yet.</p>
                    )}
                </InputMotion>
            </section>

            <section className="mb-8">
                <InputMotion delay={0.4} isFullWidth>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                        Personal Information
                    </h2>
                </InputMotion>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputMotion delay={0.5} isFullWidth>
                        <InfoCard
                            icon={<MapPin className="w-5 h-5" />}
                            label="Location"
                            value={profile?.city && profile?.country ? `${profile.city}, ${profile.country}` : null}
                        />
                    </InputMotion>
                    <InputMotion delay={0.55} isFullWidth>
                        <InfoCard
                            icon={<Phone className="w-5 h-5" />}
                            label="Phone"
                            value={profile?.phone}
                        />
                    </InputMotion>
                    <InputMotion delay={0.6} isFullWidth>
                        <InfoCard
                            icon={<Briefcase className="w-5 h-5" />}
                            label="Position"
                            value={profile?.positionName}
                        />
                    </InputMotion>
                    <InputMotion delay={0.65} isFullWidth>
                        <InfoCard
                            icon={<Globe className="w-5 h-5" />}
                            label="Nationality"
                            value={profile?.nationality}
                        />
                    </InputMotion>
                    <InputMotion delay={0.7} isFullWidth>
                        <InfoCard
                            icon={<Calendar className="w-5 h-5" />}
                            label="Birthday"
                            value={formatDateLong(profile?.birthday || "")}
                        />
                    </InputMotion>
                    <InputMotion delay={0.75} isFullWidth>
                        <InfoCard
                            icon={<User className="w-5 h-5" />}
                            label="Gender"
                            value={profile?.gender}
                        />
                    </InputMotion>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
