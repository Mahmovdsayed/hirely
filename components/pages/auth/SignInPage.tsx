'use client'

import SignInForm from "@/components/forms/auth/SignInForm";
import Silk from "@/components/Silk";

const SignInPage = () => {
    return <>
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col ">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full lg:max-w-xl">
                        <SignInForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Silk
                    speed={5}
                    scale={1}
                    color="#7B7481"
                    noiseIntensity={1.5}
                    rotation={0}
                />
            </div>
        </div>
    </>;
};

export default SignInPage;