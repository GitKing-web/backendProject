import express from 'express'
import http from 'http'
import router from './routes/router.routes'
const app = express()
const server = http.createServer(app)


app.use(express.json())
app.use('/', router)
export default server