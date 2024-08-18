import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/Blogcard"
import { Skeleton } from "../components/Skeleton"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
            <Skeleton />
        </div>
    }
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="flex justify-center mb-2 pb-2">
                <div className="min-w-min max-w-xl p-2">
                    {blogs.map(blog => <Blogcard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={""}
                    />)}
                </div>
            </div>
        </div>
    )
}

