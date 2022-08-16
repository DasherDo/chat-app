const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
	origin: '*',
}));
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

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3000', '*'],
		credentials: true,
	}
})


io.on("connection", (socket) => {
	socket.on("send-msg", (data) => {
		const to = data.recipient
		socket.to(to).emit("receive-msg", data)
	})
})