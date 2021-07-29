import express from 'express'
import userController from '../app/controllers/UserController.js'

const userRouter = express.Router()

userRouter.post('/sign-in', userController.signIn)
userRouter.post('/sign-up', userController.signUp)
userRouter.post('/refresh-token', userController.refreshToken)
userRouter.post('/logout', userController.logout)
userRouter.get('/:userId', userController.show)

export default userRouter