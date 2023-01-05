import mongoose from "mongoose";

const connectmongo = async () => {
    try {
        await mongoose.connect(`mongodb+srv://chalk:collab007@collabin.2fng8qt.mongodb.net/CollabIn_DB?retryWrites=true&w=majority`,{
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