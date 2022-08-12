const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const socket = require('socket.io');

const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);


const server = app.listen(5000, () => {
    console.log('Server started on port 5000.')
})

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => console.log('DB Connection Successful')
).catch(err => {
    console.log(`Database Connection Error: ${err.nessage}`)
})

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true
	}
})

global.online = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (user_id) => {
		online.set(user_id, socket.id);
	})

	socket.on('send-message', (data) => {
		const sendUserSocket = online.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-received', data.msg);
		}
	})
})