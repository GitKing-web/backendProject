import { Hono } from "hono";
import connectDB from "./src/config/index.config";

const app = new Hono()

const port = Bun.env.PORT || 8080

connectDB().then(() => {
    Bun.serve({
        fetch: app.fetch,
        port: port
        
    })
    console.log(`server running on port ${port}`);
}).catch(err => console.log(err))
