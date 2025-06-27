import express from "express";
import booksRouter from "./src/routes/book.routes.js";
import { startDB } from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/api", booksRouter);

startDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })
})