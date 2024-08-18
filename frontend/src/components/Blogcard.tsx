import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate?: string;
    id: number;
}

export const Blogcard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col h-screeen justify-center max-w-screen-lg min-w-max mb-4 border p-4 rounded-md cursor-pointer">
                <div className="font-light">
                    <Avatar name={authorName.toUpperCase()} /> {authorName} 
                </div>
                <div className="font-bold pt-2">
                    {title}
                </div>
                <div className="">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="font-extralight pt-2">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}


export function Avatar({ name }: { name: string }) {
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{`${name[0]}`}</span>
        </div>
    )
}