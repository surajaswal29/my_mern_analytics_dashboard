import express from "express"
import dotenv from "dotenv"
import path from "path"
import dbConfig from "./server/config/db.js"
import tempRouter from "./server/routes/tempRoutes.js"
import cors from "cors"
import { fileURLToPath } from "url"
dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
const app = express()

const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: "*",
  })
)

dbConfig()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", tempRouter)

console.log(process.env.DB_URI)
// console.log(path.resolve(__dirname, "../view/dist/index.html"))
app.use(express.static(path.join(__dirname, "./view/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./view/dist/index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
