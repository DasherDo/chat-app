const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({'users' : ['user1','user2','user3']})
})

app.get('/text/josh', (req, res) => {
    res.json({'subject' : '' , 'body' : 'hello' , 'sender' : 'Layne'})
})

app.listen(5000, () => {
    console.log('Server started on port 5000.')
})