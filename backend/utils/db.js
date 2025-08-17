import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.mongodb_URI)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("DB error: ", error)
    }
}
export default dbConn;