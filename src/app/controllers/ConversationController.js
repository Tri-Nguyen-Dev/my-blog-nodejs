import ConversationModel from './../models/Conversation.js';

class ConversationController {
    index = async (req, res) => {
        try {
            const conversation = await ConversationModel.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] }
            })

            if (!conversation) return res.status(404).json('không tìm thấy bản ghi')

            res.status(200).json(conversation)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }


    }

    store = async (req, res) => {
        try {
            const newConversation = new ConversationModel({
                members: [req.body.senderId, req.body.receiverId]
            })
            await newConversation.save()
            res.status(200).json(newConversation)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    show = async (req, res) => {
        try {
            const conversation = await ConversationModel.find({
                members: { $in: [req.params.userId] },
            })

            res.status(200).json(conversation)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }


}

const conversationController = new ConversationController

export default conversationController