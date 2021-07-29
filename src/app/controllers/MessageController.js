import MessageModel from './../models/Message.js';


class MessageController {
    store = async (req, res) => {
        try {
            const newMessage = new MessageModel(req.body)
            await newMessage.save()
            res.status(200).json(newMessage)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    show = async (req, res) => {
        try {
            const message = await MessageModel.find({
                conversationId: req.params.conversationId
            })

            res.status(200).json(message)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

}


const messageController = new MessageController

export default messageController