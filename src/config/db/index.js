import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb://tringuyen:trivip007@cluster0-shard-00-00.l5dg2.mongodb.net:27017,cluster0-shard-00-01.l5dg2.mongodb.net:27017,cluster0-shard-00-02.l5dg2.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7ctdg3-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connect database successfully");
  } catch (error) {
    console.log("Connect failure!!!", error);
  }
};
export default connectDb;
