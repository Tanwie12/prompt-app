import mongoose from "mongoose"
import dotenv from "dotenv"


let isConnected = false


export const connectToDatabase = async () => {
    if (isConnected) {
        console.log("Already connected")
        return
    }

    if (process.env.NODE_ENV !== "production") {
        dotenv.config()
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}