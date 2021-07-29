import mongoose from 'mongoose'
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("Connect database successfully")
    } catch (error) {
        console.log("Connect failure!!!", error)
    }
}
export default connectDb