import mongoose from 'mongoose'
import slug from 'mongoose-slug-updater'
import mongoosePaginate from 'mongoose-paginate-v2'


const CommentSchema = mongoose.Schema({
    author: String,
    content: String,
    name: String,
    avatar: String
}, {
    timestamps: true
})

const PostSchema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: [String],
    slug: { type: String, slug: 'title', unique: true },
    comments: [CommentSchema]
}, {
    timestamps: true
})

PostSchema.plugin(mongoosePaginate);
PostSchema.plugin(slug)

const PostModel = mongoose.model('Post', PostSchema)

export default PostModel