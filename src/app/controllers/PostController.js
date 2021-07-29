import PostModel from '../models/Post.js'

class PostController {
    index = async (req, res) => {
        try {
            const { _limit, _page, _q, _sort, _order } = req.query
            const title = new RegExp(_q, 'i')
            if (_page) {
                const options = {
                    limit: _limit ? _limit : 10,
                    page: _page ? _page : 1,
                    sort: {
                        [_sort]: _order ? _order : 'asc'
                    },

                }
                const result = await PostModel.paginate({ title }, options);

                return res.status(200).json({
                    data: result.docs,
                    pagination: {
                        _currentPage: result.page,
                        _limit: result.limit,
                        _totalRows: result.totalDocs
                    }
                })
            }

            if (_sort) {
                const posts = await PostModel.find({}).sort(`${_order === 'desc' ? '-' : ''}${_sort}`)
                return res.status(200).json(posts)
            }

            if (_q) {
                const title = new RegExp(_q, 'i')
                const posts = await PostModel.find({ title })
                return res.status(200).json(posts)
            }

            const posts = await PostModel.find({})
            res.status(200).json(posts)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    store = async (req, res, next) => {
        try {
            if (!req.userId) return res.json({ message: 'Unauthenticated' })
            const file = req.file ? req.file : null

            const dataUpload = file ? { ...req.body, selectedFile: file.path, creator: req.userId } : { ...req.body, creator: req.userId }

            const newPost = new PostModel(dataUpload)
            await newPost.save()
            res.status(201).json(newPost)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    uploadImage = async (req, res, next) => {
        try {
            if (!req.file) {
                next(new Error('No file uploaded!'));
                return;
            }
            res.status(201).json(req.file.path)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const file = req.file ? req.file : null

            const dataUpload = file ? { ...req.body, selectedFile: file.path } : req.body

            const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, dataUpload, { new: true })
            res.json(updatedPost)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const postDeleted = await PostModel.findByIdAndRemove(req.params.id)
            res.json(postDeleted)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    likePost = async (req, res) => {
        try {
            const { id } = req.params
            if (!req.userId) return res.json({ message: 'Unauthenticated' })
            const post = await PostModel.findById(id)

            const index = post.likes.findIndex(id => id === String(req.userId))

            if (index === -1) {
                post.likes.push(req.userId)
            }
            else {
                post.likes = post.likes.filter(id => id !== String(req.userId))
            }
            const updatedPost = await PostModel.findByIdAndUpdate(id, post, { new: true })
            res.json(updatedPost)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    commentPost = async (req, res) => {
        try {
            const { id } = req.params

            const { comment, name, avatar } = req.body
            if (!req.userId) return res.json({ message: 'Unauthenticated' })

            const post = await PostModel.findById(id)

            post.comments.push({
                author: req.userId,
                content: comment,
                name,
                avatar
            })

            post.save()
            res.json(post)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    deleteComment = async (req, res) => {
        try {
            if (!req.userId) return res.json({ message: 'Unauthenticated' })
            const { postId, commentId } = req.params

            const post = await PostModel.findById(postId)

            post.comments.id(commentId).remove()

            post.save()
            res.json(post)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }

    show = async (req, res) => {
        try {
            const post = await PostModel.findOne({ _id: req.params.id })
            return res.status(201).json(post)
        } catch (error) {
            return res.status(409).json({ message: error.message })
        }
    }

}

const postController = new PostController

export default postController