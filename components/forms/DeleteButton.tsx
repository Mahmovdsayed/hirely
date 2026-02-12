'use client';

import { useFormHandler } from "@/hooks/useFormHandler";
import { useState } from "react";
import z from "zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";


interface IProps {
    isIcon: boolean;
    title: string;
    serviceFunc: () => Promise<any>;
    refetch: () => void;
    warningMessage: string;
}

const DeleteButton = ({ isIcon, title, serviceFunc, refetch, warningMessage }: IProps) => {
    const [open, setOpen] = useState(false);

    const { onSubmit, loading } = useFormHandler({
        schema: z.object({}),
        service: () => serviceFunc(),
        onSuccess: () => {
            refetch();
            setOpen(false);
        },
        onError: (error) => console.log(error)
    });

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    isIcon ?
                        <Button variant="destructive" size="icon-sm" className="rounded-full"><Trash2 /></Button>
                        :
                        <Button variant="destructive" size="lg" className="gap-2 rounded-4xl w-full">
                            <Trash2 className="w-4 h-4" />
                            {title}
                        </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Avatar</DialogTitle>
                    <DialogDescription>
                        {warningMessage}
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

export default DeleteButton;