const express = require('express');

const { Post, User, Image, Comment } = require('../models')

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            limit: 10,
            // offset:0,
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            }, {
                model: Image
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname'],
                    order: [['createdAt', 'DESC']],
                }]
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(200).json(posts);
    } catch (e) {
        console.error(e)
        next(e)
    }
})


module.exports = router