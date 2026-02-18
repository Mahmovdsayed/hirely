'use client';

import { Control, FieldValues, Path } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import AlertWrapper from "@/components/ui/AlertWrapper";
import InputMotion from "@/components/motion/InputsMotion";
import { useState } from "react";

interface FormMultiInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    description?: string;
    delay?: number;
    error?: any;
    setValue: (name: any, value: any, options?: any) => void;
    watch: (name: any) => any;
}

const FormMultiInput = <T extends FieldValues>({
    name,
    label,
    placeholder,
    description,
    delay = 0,
    error,
    setValue,
    watch
}: FormMultiInputProps<T>) => {
    const values = watch(name) || [];
    const ArrayValues = Array.isArray(values) ? values : [];

    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            setValue(name as any, [...ArrayValues, inputValue.trim()], { shouldValidate: true });
            setInputValue("");
        }
    };

    const handleRemove = (index: number) => {
        const newValues = ArrayValues.filter((_, i) => i !== index);
        setValue(name as any, newValues, { shouldValidate: true });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <InputMotion delay={delay}>
            <Field className="space-y-3">
                <FieldLabel>{label}</FieldLabel>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className="rounded-full"
                        />
                        <Button
                            type="button"
                            onClick={handleAdd}
                            size="icon"
                            variant="secondary"
                            className="shrink-0 rounded-full"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    {ArrayValues.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {ArrayValues.map((value: string, index: number) => (
                                <div
                                    key={`${value}-${index}`}
                                    className="flex items-center gap-1.5 bg-secondary/50 border border-secondary text-secondary-foreground px-3 py-1.5 rounded-xl text-sm group transition-all hover:bg-secondary hover:border-primary/30"
                                >
                                    <span>{value}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {description && <FieldDescription>{description}</FieldDescription>}
                {error && (
                    <AlertWrapper
                        errText={
                            error.message ||
                            (Array.isArray(error) && error.find((e: any) => e?.message)?.message) ||
                            "Invalid input"
                        }
                    />
                )}
            </Field>
        </InputMotion>
    );
};

export default FormMultiInput;
