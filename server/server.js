const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);


app.listen(5000, () => {
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