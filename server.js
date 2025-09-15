import express from "express";
import dotenv from "dotenv";
import carrosRouter from "./src/routes/carrosRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("🚀 Servidor online");
});

app.use("/carros", carrosRouter);

app.listen(serverPort, () => {
    console.log(`Servidor em: http://localhost:${serverPort}`);
});