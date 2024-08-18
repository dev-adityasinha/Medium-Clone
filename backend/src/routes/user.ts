
import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@npm.adityasinha/medium-common-zod"


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
}>()

// SignUp Routing
userRouter.post('/signup', async c => {
    // for accessing/getting the body
    const body = await c.req.json()
    console.log(`Body response is`, body)

    const { success } = signupInput.safeParse(body)
    console.log(`Success response is: `, success)
    if (!success) {
        c.status(411)
        return c.json({
            message: 'Inputs not correct'
        })
    }
    // initialising prisma client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    // logic for creating user
    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        // json web token for authentication
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        console.log(`Jwt response in user.ts`, jwt)
        return c.text(jwt)
    } catch (error) {
        c.status(411)
        return c.text(`User already exists with same email`)
    }
})

// Signin Routing
userRouter.post('/signin', async c => {
    const body = await c.req.json()
    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: 'Inputs not correct'
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403) // status code for unauthorized access
            return c.json({
                message: "Incorrect Credentials"
            })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.JWT_SECRET)
        return c.text(jwt)
    } catch (error) {
        c.status(411)
        return c.text(`Invalid`)
    }
})
