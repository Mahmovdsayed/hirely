'use client';

import { useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import InputMotion from '@/components/motion/InputsMotion'
import AlertWrapper from '@/components/ui/AlertWrapper'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface IProps {
    name: string
    label: string
    type?: 'text' | 'email' | 'password'
    placeholder?: string
    description?: string
    autoComplete?: string
    delay: number
    register: UseFormRegister<any>
    error?: FieldError
}

const FormField = ({
    name,
    label,
    type = 'text',
    placeholder,
    description,
    autoComplete,
    delay,
    register,
    error,
}: IProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
        <InputMotion delay={delay}>
            <Field>
                <FieldLabel htmlFor={name}>{label}</FieldLabel>

                <div className="relative">
                    <Input
                        {...register(name)}
                        id={name}
                        type={inputType}
                        className="rounded-full pr-10"
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        required
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>

                {description && (
                    <FieldDescription>{description}</FieldDescription>
                )}

                {error && <AlertWrapper errText={String(error.message)} />}
            </Field>
        </InputMotion>
    )
}

export default FormField
