import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import route from './routers/index.js'
import connectDb from './config/db/index.js'
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const socketio = new Server(server, { cors: { origin: '*' } })


dotenv.config()


// socketio

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

socketio.on('connection', (socket) => {
    console.log('We have a new connection')

    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        socketio.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const userRom = users.find(user => user.userId === receiverId)

        if (userRom) {
            socketio.to(userRom.socketId).emit('getMessage', {
                senderId,
                text
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        socketio.emit('getUsers', users)
    })
})


app.use(express.json({
    limit: "30mb",
    extended: true
}))
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

// router
route(app)

// connect db
connectDb()

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`App listening at http://localhost:${port}`))