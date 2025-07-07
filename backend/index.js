import express from "express";
import cors from "cors"
import EventRouter from "./src/controllers/event-controller.js";


const app = express()
const port = 3000; 

app.use(cors())
app.use(express.json())

app.use('/api/event', EventRouter)
//app.use('/api/provinces', provinceRouter)

app.listen(port, () => {
    console.log("SERVIDOR EN " + port)
})