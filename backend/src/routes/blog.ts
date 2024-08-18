import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { verify } from "hono/jwt"
import { blogInput, updateBlog } from "@npm.adityasinha/medium-common-zod"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>()

// middleware = every time this route is hit it will go through some checks
blogRouter.use("/*", async (c, next) => {
    // extract the user id
    // pass it down to the route handler
    const authHeader = c.req.header("authorization") || "";

    try {
        console.log(`AuthHeader Response : `, authHeader)
        const user = await verify(authHeader, c.env.JWT_SECRET);
        console.log(`User`, user)
        if (user) {
            c.set("userId", String(user.id));
            // console.log(typeof user.id) // number
            // console.log(user.id)
            await next();
        }

    } catch (error) {
        c.status(403)
        return c.json({
            message: "You aren't logged in"
        })
    }
});

blogRouter.post('/', async c => {
    // access the body being sent
    const body = await c.req.json();
    const { success } = blogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: "Inputs not correct"
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)

        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async c => {
    const body = await c.req.json()
    const { success } = updateBlog.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: 'Inputs not correct'
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id

        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        message: 'Blog updated'
    })
})


// all blogs routing 
// TODO: add Pagination
blogRouter.get('/bulk', async c => {
    const prisma = new PrismaClient(({
        datasourceUrl: c.env.DATABASE_URL
    })).$extends(withAccelerate())

    const blog = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    }
    )
    return c.json({
        blog
    })
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    } catch (error) {
        c.status(404)
        return c.json({ message: `Error while fetching blogs` })
    }
})


