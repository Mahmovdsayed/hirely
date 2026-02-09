'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { deleteProfileImage } from "@/services/dashboard/profile.service";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import z from "zod";

interface IProps {
    refetch: () => void;
}
const DeleteAvatar = ({ refetch }: IProps) => {
    const [open, setOpen] = useState(false);
    const { onSubmit, loading } = useFormHandler({
        schema: z.object({}),
        service: () => deleteProfileImage(),
        onSuccess: () => {
            refetch();
            setOpen(false);
        },
        onError: (error) => console.log(error)
    });
    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="lg" className="gap-2 rounded-4xl w-full">
                    <Trash2 className="w-4 h-4" />
                    Delete Avatar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Avatar</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your avatar?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="rounded-4xl">Cancel</Button>
                    </DialogClose>
                    <Button className="rounded-4xl" variant="destructive" onClick={onSubmit} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>;
};

export default DeleteAvatar;