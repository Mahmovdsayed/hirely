'use clinet'
interface IProps {
    content: string
}
const NotFoundDahboard = ({ content }: IProps) => {
    return <>
        <div className="flex flex-col items-center justify-center h-48 rounded-4xl border border-dashed text-muted-foreground p-6">
            <p>{content}</p>
        </div>
    </>;
};

export default NotFoundDahboard;