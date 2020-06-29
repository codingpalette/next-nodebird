const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', isNotLoggedIn, (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr)
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where: {id : user.id},
                // attributes: ['id', 'nickname', 'email'], // 3개만 가져오기
                attributes: { // 비밀번호 제외하고 가져오기
                    exclude: ['password']
                },
                include: [{
                    model: Post
                }, {
                    model: User,
                    as: 'Followings',
                }, {
                    model: User,
                    as: 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword)
        })
    })(req, res, next)
});

router.post('/', isNotLoggedIn, async (req, res, next) => {  // POST /user/
    try {
        const exUser = await User.findOne({
           where: {
               email: req.body.email,
           }
        });
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword
        });
        res.status(200).send('ok')
    } catch (e) {
        console.error(e)
        next(e)  // status 500
    }

});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
})



module.exports = router;