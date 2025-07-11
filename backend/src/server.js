import 'dotenv/config.js'
import express from "express";
import cors from "cors"

//Routers
import EventController from "./controllers/event-controller.js";        

const app = express()
const port =  process.env.PORT ?? 3000;

app.use(cors())
app.use(express.json())

app.use("/api/eventos", EventController)

//app.use('/api/provinces', provinceRouter)

app.listen(port, () => {
    console.log("SERVIDOR EN " + port)
})