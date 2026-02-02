'use client';
import Silk from "@/components/sections/Silk";

const Page = () => {
  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Silk
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-neutral-400">
            Launching Soon
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white">
            Hirely
          </h1>

          <h2 className="mt-4 text-lg md:text-2xl font-medium text-neutral-200">
            AI-Powered Freelance and Portfolio Platform
          </h2>

          <p className="mt-3 text-sm md:text-base text-neutral-400">
            AI-powered freelance and portfolio platform for freelancers and portfolio builders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
