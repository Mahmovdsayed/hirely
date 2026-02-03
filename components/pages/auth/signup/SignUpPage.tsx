'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    User,
    Building2,
    Search,
    ChevronLeft,
    ArrowRight,
} from 'lucide-react';
import Stepper from '@/components/pages/auth/signup/Stepper';
import RoleCard from '@/components/pages/auth/signup/RoleCard';
import StepWrapper from '@/components/pages/auth/signup/StepWrapper';
import SubmitButton from '@/components/ui/SubmitButton';
import SignUpForm from '@/components/forms/auth/SignUpForm';
import InputMotion from '@/components/motion/InputsMotion';
import { useRouter } from 'next/navigation';

type Role = 'freelancer' | 'client' | 'company';
type Step = 0 | 1;

const roles = [
    {
        id: 'freelancer' as Role,
        title: 'Join as Freelancer',
        description: 'Create a professional profile, showcase your skills and projects, and get discovered by clients. Use AI tools to improve your CV, portfolio, and profile content',
        badge: 'Most Popular',
        icon: User,
    },
    {
        id: 'client' as Role,
        title: 'Join as Client',
        description: 'Find freelancers, search and filter profiles, view portfolios and CVs, and contact talent for short-term or personal projects',
        badge: 'Best for short-term projects',
        icon: Search,
    },
    {
        id: 'company' as Role,
        title: 'Join as Company',
        description: 'Manage hiring at scale. Search and hire freelancers, save candidates, coordinate teams, and handle long-term or ongoing projects.',
        badge: 'Best for long-term projects',
        icon: Building2,
    },
];

const SignUpPage = () => {
    const router = useRouter();

    const [step, setStep] = useState<Step>(0);
    const [role, setRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (roleId: Role) => setRole(roleId);
    const handleBack = () => step > 0 && setStep((step - 1) as Step);
    const handleContinue = () => step === 0 && role && setStep(1);

    return (
        <div>
            <div className="container max-w-5xl mx-auto">
                <div className="text-start mb-8 md:mb-12">
                    <InputMotion delay={0.1}>
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 md:mb-3">
                            Start your journey
                        </h1>
                    </InputMotion>
                    <InputMotion delay={0.2}>
                        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl">
                            Choose how you want to use Hirely and set up your profile in seconds.
                        </p>
                    </InputMotion>
                </div>

                <InputMotion delay={0.3}>
                    <Stepper
                        steps={['Select Account Type', 'Profile Details']}
                        currentStep={step}
                    />
                </InputMotion>

                <div className="relative mt-4 md:mt-8">
                    <StepWrapper isVisible={step === 0}>
                        <div className="mb-6 md:mb-10 text-start md:text-left">
                            <InputMotion delay={0.4}>
                                <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2">Select your goal</h2>
                            </InputMotion>
                            <InputMotion delay={0.5}>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Choose the account type that best fits your needs.
                                </p>
                            </InputMotion>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mb-8 md:mb-10">
                            {roles.map((r, idx) => (
                                <div key={r.id} className="role-card-item">
                                    <RoleCard
                                        {...r}
                                        selected={role === r.id}
                                        onClick={() => handleRoleSelect(r.id)}
                                        delay={0.6 + idx * 0.1}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 justify-center">
                            <InputMotion delay={1.0}>
                                <SubmitButton
                                    title={isLoading ? 'Loading...' : 'Continue'}
                                    disabled={!role}
                                    isLoading={isLoading}
                                    onClick={handleContinue}
                                    type='button'
                                    size='lg'
                                    variant={"default"}
                                    icon={<ArrowRight size={18} />}
                                />
                            </InputMotion>
                            <InputMotion delay={0.9} isFullWidth>
                                <p className="text-sm text-center text-muted-foreground">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => router.push('/auth/sign-in')}
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </InputMotion>
                        </div>

                    </StepWrapper>

                    <StepWrapper isVisible={step === 1}>
                        <div className="">
                            <div className="mb-6 md:mb-8 flex items-center gap-3">
                                <InputMotion isFullWidth delay={0.1}>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleBack}
                                        className="rounded-xl h-10 w-10 shrink-0"
                                    >
                                        <ChevronLeft size={18} />
                                    </Button>
                                </InputMotion>
                                <div className='text-start w-full'>
                                    <InputMotion isFullWidth delay={0.2}>
                                        <h2 className="text-xl md:text-2xl font-semibold">Account details</h2>
                                    </InputMotion>
                                    <InputMotion isFullWidth delay={0.3}>
                                        <p className="text-muted-foreground text-xs md:text-sm">
                                            Signing up as <span className="text-primary font-semibold capitalize">{role}</span>
                                        </p>
                                    </InputMotion>
                                </div>
                            </div>
                            <SignUpForm roleId={role as Role} />
                        </div>
                    </StepWrapper>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

