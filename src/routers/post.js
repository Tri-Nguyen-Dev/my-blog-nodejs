import express from 'express'
import postController from '../app/controllers/PostController.js'
import authMiddleware from '../app/middlewares/AuthMiddleware.js'
import upload from '../config/cloudinary/cloudinary.config.js'

const postRoute = express.Router()

postRoute.patch('/:id/like-post', authMiddleware, postController.likePost)
postRoute.patch('/:id', authMiddleware, upload.single('selectedFile'), postController.update)
postRoute.delete('/:id', authMiddleware, postController.delete)


postRoute.get('/:id', postController.show)
postRoute.get('/', postController.index)
postRoute.post('/', authMiddleware, upload.single('selectedFile'), postController.store)

postRoute.post('/:id/comment-post', authMiddleware, postController.commentPost)

postRoute.post('/upload-image', upload.single('file'), postController.uploadImage)

postRoute.patch('/:postId/:commentId', authMiddleware, postController.deleteComment)

export default postRoute