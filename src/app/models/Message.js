import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
    conversationId: { type: String },
    sender: { type: String },
    text: { type: String }
}, {
    timestamps: true
})


const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel