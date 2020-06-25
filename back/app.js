const express = require('express');
const postRouter = require('./routes/post');

const app = express();

app.get('/', (req, res) => {
    res.send('hellow')
})

app.use('/post', postRouter)

app.listen(5000, () => {
    console.log('서버실행중')
})