import mongoose from "mongoose";

const connectmongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
    };

export default connectmongo;