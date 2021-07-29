import jwtRoute from "./jwt.js"
import postRoute from "./post.js"
import userRoute from "./user.js"
import conversationRoute from './conversation.js'
import messageRoute from './message.js'

const route = (app) => {
    app.use('/api/users', userRoute)
    app.use('/api/posts', postRoute)
    app.use('/api/jwt', jwtRoute)
    app.use('/api/conversations', conversationRoute)
    app.use('/api/messages', messageRoute)
}
export default route