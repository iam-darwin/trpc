import mongoose from "mongoose";

// Connection URI with username and password replaced with actual credentials
const uri = 'mongodb+srv://iamjoey:987791@iamjoey.ho9mgqf.mongodb.net/';

// Options for mongoose connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

// Connect to MongoDB
export const dbConnect=async ()=>{
    await mongoose.connect(uri,{
        dbName:"todo"
    });

    console.log("Db is connected")
}


