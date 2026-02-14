'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ZoomIn, RotateCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import getCroppedImg from "@/functions/cropImage";

interface ImageCropperProps {
    imageSrc: string;
    onCropSave: (croppedFile: File) => void;
    onCancel: () => void;
    aspect?: number;
    title?: string;
}

export function ImageCropper({
    imageSrc,
    onCropSave,
    onCancel,
    aspect = 1,
    title = "Crop Image"
}: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            );
            if (croppedImage) {
                onCropSave(croppedImage);
            }
        } catch (e) {
            console.error("Failed to crop image:", e);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full" onPointerDown={(e) => e.stopPropagation()}>
            <div className="w-full h-[350px] bg-neutral-950 rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-800 relative">
                {/* Ambient Background layer for the cropper */}
                <div className="absolute inset-0 w-full h-full scale-125 blur-2xl opacity-20 pointer-events-none">
                    <img
                        src={imageSrc}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    classes={{
                        containerClassName: "z-10",
                    }}
                />
            </div>

            <div className="space-y-6 px-2">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <ZoomIn className="w-4 h-4" />
                            <span>Zoom</span>
                        </div>
                        <span className="text-xs font-mono bg-secondary px-2 py-1 rounded-md">
                            {Math.round(zoom * 100)}%
                        </span>
                    </div>
                    <Slider
                        value={[zoom]}
                        min={1}
                        max={3}
                        step={0.1}
                        onValueChange={(value) => setZoom(value[0])}
                        className="py-2"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <RotateCw className="w-4 h-4" />
                            <span>Rotation</span>
                        </div>
                        <span className="text-xs font-mono bg-secondary px-2 py-1 rounded-md">
                            {rotation}°
                        </span>
                    </div>
                    <Slider
                        value={[rotation]}
                        min={0}
                        max={360}
                        step={1}
                        onValueChange={(value) => setRotation(value[0])}
                        className="py-2"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onCancel}
                        className="rounded-full gap-2"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="rounded-full gap-2 px-6"
                    >
                        <Check className="w-4 h-4" />
                        Apply Crop
                    </Button>
                </div>
            </div>
        </div>
    );
}
