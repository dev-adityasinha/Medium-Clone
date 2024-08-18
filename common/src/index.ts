import z from "zod"

// signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

// signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

// create blog
export const blogInput = z.object({
    title: z.string(),
    content: z.string()
})

// update blog
export const updateBlog = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string()
})


// type inference in Zod
export type SignupInput = z.infer<typeof signupInput>
export type UpdateBlog = z.infer<typeof updateBlog>
export type BlogInput = z.infer<typeof blogInput>
export type SigninInput = z.infer<typeof signinInput>
