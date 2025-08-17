import express from "express";
import dotenv from "dotenv";
import dbConn from "./utils/db.js";
import cors from "cors";
import router from "./router/router.js";
dotenv.config();

const app = express();
const PORT = 8000;

const corsOptions = {
    origin: "https://fullstack-product-mangement.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
};


//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/", router)

app.listen(PORT, () => {
    dbConn();
    console.log(`Server is running on ${PORT}`);
})