import mongoose from "mongoose";

async function connect(){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connection is successful");
}

export default connect;
