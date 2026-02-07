'use client';

import { FieldError, UseFormRegister } from 'react-hook-form'
import InputMotion from '@/components/motion/InputsMotion'
import AlertWrapper from '@/components/ui/AlertWrapper'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

interface IProps {
    name: string
    label: string
    placeholder?: string
    description?: string
    delay: number
    register: UseFormRegister<any>
    error?: FieldError
    defaultValue?: string | number | readonly string[] | undefined
    className?: string
    isMotionDisabled?: boolean
    rows?: number
}

const FormTextarea = ({
    name,
    label,
    placeholder,
    description,
    delay,
    register,
    error,
    defaultValue,
    className,
    isMotionDisabled,
    rows
}: IProps) => {
    return (
        <InputMotion isMotionDisabled={isMotionDisabled} delay={delay}>
            <Field>
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <Textarea
                    {...register(name)}
                    id={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    className={`rounded-2xl resize-none ${className || ''}`}
                    rows={rows}
                />

                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}

                {error && <AlertWrapper errText={String(error.message)} />}
            </Field>
        </InputMotion>
    )
}

export default FormTextarea
