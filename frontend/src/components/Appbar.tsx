import { Avatar } from "./Blogcard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between pl-12 pt-1">
        <Link to={"/blogs"}>
            <div className="text-2xl text-slate-600 font-bold m-3 cursor-pointer">
                Medium
            </div>
        </Link>
        <div className="flex gap-12 justify-between pt-2 pr-4">
            <div className="align-middle justify-center">
                <Link to={'/publish'}>
                    <button className="p-2 border rounded-md border-green-500 bg-green-500 text-white">New Blog</button>
                </Link>
            </div>
            <div className="h-14 w-15 pr-2 pt-1 cursor-pointer">
                <Avatar name="Aditya" />
            </div>
        </div>
    </div>


}