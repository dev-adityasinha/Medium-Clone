
import { Appbar } from "../components/Appbar"
import { BlogBody } from "../components/BlogBody"
import { Skeleton } from "../components/Skeleton"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"


export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ''
    })

    if (loading) {
        <Skeleton />
    }
    return <div>
        <Appbar />
        <BlogBody blog={blog} />
    </div>

}