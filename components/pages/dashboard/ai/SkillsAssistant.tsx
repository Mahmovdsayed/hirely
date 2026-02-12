'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Check, Sparkles, TrendingUp, Zap } from "lucide-react";

const SkillsAssistant = () => {
    return <>
        <Card className="bg-muted/40 border-dashed rounded-4xl overflow-hidden relative mt-8">
            <div className="absolute -top-6 -right-6 p-8 opacity-5">
                <Bot className="w-64 h-64 rotate-12" />
            </div>
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                        <Sparkles className="md:w-6 md:h-6 w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-sm md:text-xl">AI Career Coach</CardTitle>
                        <CardDescription className="text-xs md:text-base mt-1">
                            Unlock your full potential with AI-powered insights tailored just for you.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    {[
                        { icon: Zap, text: "Identify critical skill gaps for your target role" },
                        { icon: TrendingUp, text: "Get personalized learning path recommendations" },
                        { icon: Check, text: "Optimize your profile for maximum visibility" },
                        { icon: Bot, text: "Receive smart job matches based on expertise" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-xs md:text-sm font-medium text-foreground/80 bg-background/60 p-3 rounded-4xl border border-border/50">
                            <div className="p-1.5 bg-primary/5 rounded-lg shrink-0">
                                <item.icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="mt-0.5">{item.text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button size="lg" className="w-full sm:w-auto gap-2 rounded-full shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5" />
                    Analyze My Profile
                </Button>
            </CardFooter>
        </Card>
    </>;
};

export default SkillsAssistant;