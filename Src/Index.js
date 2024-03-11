import express, { json } from "express"; //* Express Js For crate API
import cors from 'cors' //* Cors for handle CORS
import routerPost from "./Routes/PostRoutes.js";

const app = express(); //* Create la API


//* Handle de midwlares

app.use(json());
app.use(cors());
app.use('/post', routerPost)

//? Manejo de imagenes



const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Listening in http://localhost:${PORT}`)
})