'use client';

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Save, X, Palette } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload";
import { cn } from "@/lib/utils";
import { applyFilterToFile } from "@/functions/applyFilter";
import { updateAvatar } from "@/services/dashboard/profile.service";
import { compressImage } from "@/functions/compressImage";
import { useFormHandler } from "@/hooks/useFormHandler";
import { editProfileImageValidationSchema } from "@/validations/dashboard/profile/editProfileValidation";
import { IMAGE_FILTERS } from "@/constants/statics";
import DeleteAvatar from "./DeleteAvatar";
import { ImageCropper } from "@/components/ui/image-cropper";


interface IProps {
    currentAvatar: string;
    refetch: () => void;
}

const UpdateAvatar = ({ currentAvatar, refetch }: IProps) => {
    const [file, setFile] = useState<File | undefined>();
    const [selectedFilter, setSelectedFilter] = useState("none");
    const [isOpen, setIsOpen] = useState(false);
    const [editingFileSrc, setEditingFileSrc] = useState<string | null>(null);

    const handleFileSelect = async (newFile?: File) => {
        if (!newFile) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setEditingFileSrc(reader.result as string);
        });
        reader.readAsDataURL(newFile);
    };

    const handleCropSave = async (croppedImage: File) => {
        setFile(croppedImage);
        setEditingFileSrc(null);
    };

    const serviceFunc = async () => {
        if (!file) throw new Error("Please select an image first");

        const filteredFile = await applyFilterToFile(file, selectedFilter);
        const compressedFile = await compressImage(filteredFile, "square");

        if (!compressedFile) throw new Error("Image processing failed");

        return updateAvatar(compressedFile);
    }

    const { onSubmit, loading, setValue, reset } = useFormHandler({
        schema: editProfileImageValidationSchema,
        service: serviceFunc,
        onSuccess: () => {
            refetch();
            setIsOpen(false);
            setFile(undefined);
            setSelectedFilter("none");
            reset();
            setEditingFileSrc(null);
        },
        onError: (error) => console.log(error)
    });

    useEffect(() => {
        setValue("avatar", file);
    }, [file, setValue]);

    return <>
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setEditingFileSrc(null);
                setFile(undefined);
            }
        }}>
            <DialogTrigger asChild>
                <Button
                    className="border-2 border-neutral-200 dark:border-neutral-800 absolute bottom-0 right-0 rounded-full bg-white dark:bg-neutral-900  shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    aria-label="Upload photo"
                    size={"icon"}
                >
                    <Camera className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>{editingFileSrc ? "Crop Image" : "Update Avatar"}</DialogTitle>
                    <DialogDescription>
                        {editingFileSrc ? "Adjust the image to center the subject." : "Upload a new avatar and apply premium filters."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6 overflow-y-auto max-h-[70vh] px-1">
                    {editingFileSrc ? (
                        <ImageCropper
                            imageSrc={editingFileSrc}
                            onCropSave={handleCropSave}
                            onCancel={() => setEditingFileSrc(null)}
                        />
                    ) : (
                        <>
                            <div className="flex justify-center w-full">
                                <ImageUpload
                                    value={file || currentAvatar}
                                    onChange={handleFileSelect}
                                    onRemove={() => {
                                        setFile(undefined);
                                        setSelectedFilter("none");
                                    }}
                                    rounded="rounded-4xl"
                                    filter={selectedFilter}
                                    className="max-w-[400px]"
                                />
                            </div>

                            {file && (
                                <div className="space-y-4 w-full">
                                    <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        <Palette className="w-4 h-4" />
                                        <span>Choose a filter</span>
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide">
                                        {IMAGE_FILTERS.map((filter) => (
                                            <button
                                                key={filter.name}
                                                onClick={() => setSelectedFilter(filter.value)}
                                                className={cn(
                                                    "shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all",
                                                    selectedFilter === filter.value
                                                        ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-md scale-105"
                                                        : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700"
                                                )}
                                            >
                                                {filter.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <DialogFooter className="sm:justify-between gap-4">
                    {editingFileSrc ? null : (
                        <div className="flex flex-col gap-2 items-center w-full">
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <DeleteAvatar refetch={refetch} />
                                <Button
                                    type="button"
                                    onClick={onSubmit}
                                    disabled={!file || loading}
                                    size={"lg"}
                                    className="rounded-4xl w-full"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </div>
                                    )}
                                </Button>
                            </div>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="w-full rounded-4xl">
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog >
    </>;
};

export default UpdateAvatar;