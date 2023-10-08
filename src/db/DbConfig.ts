import mongoose from "mongoose";

class DbConfig{
    static initializeDb(){
        mongoose.connection.on("open", () => {
            console.log("Database was connect")
          })
        mongoose.connect(process.env.DATABASE_URL as string)
    }
}

export { DbConfig }