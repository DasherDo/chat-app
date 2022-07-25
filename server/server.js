const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes')

app.use('/api/auth', userRoutes)


app.listen(5000, () => {
    console.log('Server started on port 5000.')
})