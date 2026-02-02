'use client';

import { Alert, AlertTitle } from "@/components/ui/alert";

interface IProps {
    errText: string;
    variant?: "default" | "destructive" | null | undefined
}
const AlertWrapper = ({ errText, variant = "destructive" }: IProps) => {
    return <>
        <Alert variant={variant}>
            <AlertTitle>
                {errText}
            </AlertTitle>
        </Alert>
    </>;
};

export default AlertWrapper;