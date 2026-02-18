'use client';

import { FieldError, UseFormRegister } from 'react-hook-form'
import InputMotion from '@/components/motion/InputsMotion'
import AlertWrapper from '@/components/ui/AlertWrapper'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Facebook } from 'lucide-react';

interface IProps {
    name: string
    label: string
    description?: string
    delay: number
    register: UseFormRegister<any>
    error?: FieldError
    defaultValue?: string | number | readonly string[] | undefined
    className?: string
    isMotionDisabled?: boolean
    options: { value: string; label: string }[]
    placeholder?: string
}

const FormSelect = ({
    name,
    label,
    description,
    delay,
    register,
    error,
    defaultValue,
    className,
    isMotionDisabled,
    options,
    placeholder
}: IProps) => {
    return (
        <InputMotion isMotionDisabled={isMotionDisabled} delay={delay}>
            <Field>
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <NativeSelect
                    {...register(name)}
                    id={name}
                    defaultValue={defaultValue}
                    className={`rounded-full ${className || ''}`}
                >
                    {placeholder && <NativeSelectOption value="">{placeholder}</NativeSelectOption>}
                    {options.map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>

                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}

                {error && <AlertWrapper errText={String(error.message)} />}
            </Field>
        </InputMotion>
    )
}

export default FormSelect
