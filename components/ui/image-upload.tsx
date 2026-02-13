'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
    value?: string | File;
    onChange: (file?: File) => void;
    onRemove: () => void;
    className?: string;
    rounded?: string;
    filter?: string;
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    className,
    rounded = "rounded-lg",
    filter = "none",
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    React.useEffect(() => {
        if (typeof value === 'string') {
            setPreview(value);
        } else if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                onChange(file);
            }
        },
        [onChange]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
        },
        maxFiles: 1,
        multiple: false,
    });

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove();
        setPreview(null);
    };

    return (
        <div className={cn("w-full", className)}>
            {preview ? (
                <div className={cn("relative aspect-square w-full overflow-hidden border border-neutral-200 dark:border-neutral-800", rounded)}>
                    <Button
                        type="button"
                        onClick={handleRemove}
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 z-10 rounded-full h-8 w-8 shadow-lg"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <Image
                        fill
                        src={preview}
                        alt="Upload preview"
                        className="object-cover transition-all duration-300"
                        style={{ filter }}
                    />
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={cn(
                        "relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 text-center transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900",
                        rounded,
                        isDragActive && "border-neutral-900 dark:border-neutral-100 bg-neutral-100/50 dark:bg-neutral-800/50",
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400">
                        <div className="rounded-full bg-white p-4 shadow-sm dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                            <Upload className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs">
                                PNG, JPG , WEBP or JPEG (max. 5MB)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

