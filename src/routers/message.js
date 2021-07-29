import express from 'express'
import messageController from '../app/controllers/MessageController.js'

const messageRouter = express.Router()

messageRouter.post("/", messageController.store)
messageRouter.get("/:conversationId", messageController.show)

export default messageRouter