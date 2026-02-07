'use client';

import { Control, Controller, FieldError, UseFormRegister } from 'react-hook-form'
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import InputMotion from '@/components/motion/InputsMotion'
import AlertWrapper from '@/components/ui/AlertWrapper'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface IProps {
    name: string
    label: string
    description?: string
    delay: number
    control: Control<any>
    error?: FieldError
    defaultValue?: string | Date | undefined
    className?: string
    isMotionDisabled?: boolean
    placeholder?: string
    fromYear?: number
    toYear?: number
}

const FormDatePicker = ({
    name,
    label,
    description,
    delay,
    control,
    error,
    defaultValue,
    className,
    isMotionDisabled,
    placeholder = "Pick a date",
    fromYear = 1900,
    toYear = new Date().getFullYear()
}: IProps) => {
    return (
        <InputMotion isMotionDisabled={isMotionDisabled} delay={delay}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Field className="flex flex-col">
                        <FieldLabel>{label}</FieldLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full rounded-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        className
                                    )}
                                >
                                    {field.value ? (
                                        format(new Date(field.value), "PPP")
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                    captionLayout="dropdown"
                                    fromYear={fromYear}
                                    toYear={toYear}
                                />
                            </PopoverContent>
                        </Popover>

                        {description && (
                            <FieldDescription>{description}</FieldDescription>
                        )}

                        {error && <AlertWrapper errText={String(error.message)} />}
                    </Field>
                )}
            />
        </InputMotion>
    )
}

export default FormDatePicker
