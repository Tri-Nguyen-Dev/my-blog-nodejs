import mongoose from 'mongoose'

const TokenSchema = mongoose.Schema({
    refreshToken: { type: String }
}, {
    timestamps: true
})


const TokenModel = mongoose.model('Token', TokenSchema)

export default TokenModel