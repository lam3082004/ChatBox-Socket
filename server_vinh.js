
const mongoose= require('mongoose')
const express = require('express')
const Msg = require('./models/messages')
const app = express()

//dùng để sử dụng biên môi trường
require('dotenv').config()

// socket
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)
// const io = require('socket.io')(3000)

// const connectDB = async () => {
//     try {                   
//         await mongoose.connect(
//             `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@test-socket.2gqdv.mongodb.net/Learn?retryWrites=true&w=majority`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })

//         console.log('MongoDB connected')
//     } catch (error) {
//         console.log(error.message)
//         process.exit(1)
//     }
// };

// connectDB()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // res.send('test server')
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

// io.on('connection', (socket) => {

//     // Msg.find().then(result => {
//     //     socket.emit('chat message', result)
//     // })

//     socket.on('chat message', msg => {
//         const message = new Msg({ msg });

//         message.save().then(() => {
//             io.emit('chat message', msg)
//         })
//     })
// });


server.listen(3008, () => {
    console.log('listening on Port 3008');
});
