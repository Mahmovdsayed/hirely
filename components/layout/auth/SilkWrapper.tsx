'use client'
import Silk from "@/components/sections/Silk";
import { Sparkles, Brain, Search, TrendingUp, Zap, BarChart3, Users } from "lucide-react";

const infoItems = [
    {
        icon: <Sparkles className="w-5 h-5 text-neutral-400" />,
        title: "AI-Powered Presentation",
        desc: "Automates profile, CV, and portfolio optimization to align with real-time market demand and industry standards."
    },
    {
        icon: <Brain className="w-5 h-5 text-neutral-400" />,
        title: "Intelligent Matching",
        desc: "Neural algorithms that evaluate client requirements against freelancer capabilities for precision recommendations."
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-neutral-400" />,
        title: "Market-Driven Guidance",
        desc: "Real-time skill development recommendations based on emerging industry trends and live market analytics."
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-neutral-400" />,
        title: "Data-Driven Insights",
        desc: "Comprehensive analytics on profile performance, search visibility, and professional engagement metrics."
    },
    {
        icon: <Zap className="w-5 h-5 text-neutral-400" />,
        title: "Unified Workflow",
        desc: "Consolidates discovery, presentation, and initial communication into a single, high-performance ecosystem."
    }
];

const SilkWrapper = () => {
    return (
        <div className="relative hidden xl:flex h-full overflow-hidden border-r border-white/5 flex-col p-12 bg-black">
            <div className="absolute inset-0 z-0">
                <Silk
                    color="#242027"
                    speed={6.5}
                    noiseIntensity={1.5}
                />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Hirely - AI-Powered Freelance and Portfolio Platform</h1>
                    <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed font-light">
                        Transforming the freelance marketplace into a structured, AI-augmented ecosystem where talent meets discovery.
                    </p>
                </div>

                <div className="space-y-12 flex-1 overflow-y-auto no-scrollbar pr-4 pb-8">
                    <section className="space-y-4">
                        <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] opacity-80">The Mission</h2>
                        <p className="text-neutral-400 leading-relaxed text-sm font-light">
                            Moving beyond traditional job boards, Hirely creates an intelligent discovery experience.
                            We solve the disconnect between unoptimized freelancer visibility and manual client search fatigue
                            caused by a lack of structured data and intelligent matching.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] opacity-80">Core Innovations</h2>
                        <div className="grid gap-6">
                            {infoItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-white font-medium text-sm">{item.title}</h4>
                                        <p className="text-neutral-400 text-xs leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] opacity-80">Platform Ecosystem</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <Users className="w-4 h-4 opacity-60" />
                                    <h4 className="text-xs font-bold uppercase tracking-widest">Freelancer Advantage</h4>
                                </div>
                                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                                    Acts as an intelligent co-pilot, automatically enhancing narratives, generating professional summaries, and optimizing metadata to elevate visibility.
                                </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white/2 border border-white/5 space-y-2">
                                <div className="flex items-center gap-2 text-white mb-1">
                                    <Search className="w-4 h-4 opacity-60" />
                                    <h4 className="text-xs font-bold uppercase tracking-widest">Client Experience</h4>
                                </div>
                                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                                    Provides a precision discovery engine where neural search algorithms analyze requirements against optimized data to surface ideal talent in seconds.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SilkWrapper;