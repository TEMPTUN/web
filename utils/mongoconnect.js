import mongoose from "mongoose";
import { MONGO_URI } from './connection'

const connectmongo = async () => {
    try {
        await mongoose.connect(MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("-----------------------Mongo_connect_error--------------------");
        console.log(error);
    }
    };

export default connectmongo;