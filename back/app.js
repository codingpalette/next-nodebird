const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');


const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.error)

passportConfig();

app.use(morgan('dev'))
app.use(cors({
    origin: true, // 나중에는 실제 프론트 주소를 넣어야함
    credentials: true, // 서로 다른 도메인간 쿠기 보내기 허용
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);



app.listen(5000, () => {
    console.log('서버실행중')
})