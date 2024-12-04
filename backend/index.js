import express from "express"
import questionRoutes from "./routes/questionRoutes.js"

const app = express()
app.set("trust proxy", 1)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/questions", questionRoutes)

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})
