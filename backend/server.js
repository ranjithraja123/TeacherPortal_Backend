import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import studentRoutes from './routes/student.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000


//middlewares
app.use(express.json()) //to parse the json data
app.use(cookieParser()); // to parse the data stored in cookies
app.use('/api/auth',authRoutes)
app.use('/api/students',studentRoutes)


app.get("/",(req,res) => {
    res.send("Hello World")
})

app.listen(PORT,() => {
    connectDB()
    console.log(`Server on Port ${PORT}`)
} )