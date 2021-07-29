import express from 'express'
import conversationController from '../app/controllers/ConversationController.js'

const conversationRouter = express.Router()

conversationRouter.post("/", conversationController.store)
conversationRouter.get("/:userId", conversationController.show)
conversationRouter.get("/:firstUserId/:secondUserId", conversationController.index)

export default conversationRouter