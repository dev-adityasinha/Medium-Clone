import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

// its necessary to inject this as it will show a compilation error if not done so and it will show database url undefined
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// cors
app.use(`/*`, cors())
// middlewares
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)


export default app;
