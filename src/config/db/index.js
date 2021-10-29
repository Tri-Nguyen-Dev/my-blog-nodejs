import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tringuyen:trivip007@cluster0.l5dg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
