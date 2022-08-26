const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);

const server = app.listen(5000, () => {
	console.log('Server started on port 5000.');
});

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connection Successful'))
	.catch((err) => {
		console.log(`Database Connection Error: ${err.nessage}`);
	});

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
	},
});

let online = [];

const addOnline = (userId, socketId) => {
	!online.some((user) => user.userId === userId) &&
		online.push({ userId, socketId });
};

const getRecipient = (recipientId) => {
	return online.find((user) => {
		user.userId === recipientId;
	});
};

const moveOffline = (socketId) => {
	online = online.filter((user) => user.socketId !== socketId);
};

io.on('connect_error', (err) => {
	console.log(`Connect error due to ${err.message}`);
});

io.on('connection', (socket) => {
	socket.on('addUser', (userId) => {
		addOnline(userId, socket.id);
		io.emit('getUsers', online);
	});

	socket.on('send-msg', (data) => {
		const recipient = getRecipient(data.recipient);
		console.log(recipient);
		socket.to(recipient.socketId).emit('receive-msg', data);
	});

	socket.on('disconnect', () => {
		moveOffline(socket.id);
		io.emit('getUsers', online);
	});
});
