import express from "express";
import cors from "cors"

const app = express()
const port = 3000; 

app.use(cors())
app.use(express.json())

//app.use('/api/enveto, RutaEvento)
//app.use('/api/provinces', provinceRouter)

app.listen(port, () => {
    console.log("SERVIDOR EN " + port)
})