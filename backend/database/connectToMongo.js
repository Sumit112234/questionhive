import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
configDotenv();

const connectDb =  async function(){
    // let uri = "mongodb+srv://<db_username>:<db_password>@cluster0.tvbous1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
   
    let uri = process.env.MONGO_URI;
    
    try {

        await mongoose.connect(uri);
        console.log("Mongoose Connected!");
    } catch (error) {
        console.log("Mongoose not connected!");
    }
}

export default connectDb;
