'use client'
import Silk from "@/components/sections/Silk";

const SilkWrapper = () => {
    return <>
        <div className="bg-muted relative hidden lg:block">
            <Silk
                speed={5}
                scale={1}
                color="#2563EB"
                noiseIntensity={1.5}
                rotation={0}
            />
        </div>
    </>;
};

export default SilkWrapper;