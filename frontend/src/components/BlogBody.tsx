import { Blog } from "../hooks";
import { Avatar } from "./Blogcard"


export const BlogBody = ({ blog }: { blog: Blog }) => {
    if (blog)
        return (
            <div>
                <div className="grid grid-cols-12 pt-12 max-w-screen-xl p-4 ml-14">
                    <div className="col-span-8 m-4">
                        <div className="text-[1.6rem] font-bold">
                            {blog?.title}
                        </div>
                        <div className="text-slate-500 text-sm font-extralight">
                            Posted on : {Date.now()}
                        </div>
                        <div className="pt-4 space-x-1 text-[1.1rem] text-justify mt-2">
                            {blog?.content} 
                        </div>
                    </div>
                    <div className="col-span-4 w-full pt-6">
                        <div className="ml-11">
                            <div className="flex flex-col w-full">
                                Author
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col align-middle justify-center">
                                    <Avatar name={blog?.author.name.toUpperCase()} />
                                </div>
                                <div className="flex flex-col pl-6">
                                    <div className="font-extrabold text-xl">
                                        {blog?.author.name}
                                    </div>
                                    <div className="text-sm">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam consequatur dolorem corporis.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}