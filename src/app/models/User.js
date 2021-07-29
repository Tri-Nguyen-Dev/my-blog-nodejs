import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    image: { type: String }
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel