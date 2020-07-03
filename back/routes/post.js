const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Comment, Image, User, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();


try {
    fs.accessSync('uploads')
} catch (e) {
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads')
}


const upload = multer({
    storage: multer.diskStorage({
        destination(req, res, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자 추출(png)
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' + new Date().getTime() + ext); // 이미지12465464.png
        }
    }),
    limits: {fileSize: 20 * 1024 * 1024}, // 20MB

});


router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id
        });
        if (hashtags) {
            const res = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
               where: { name: tag.slice(1).toLowerCase() },
            }))); // [[노드, true], [리액트. true]]
            await post.addHashtags(res.map((v) => v[0]))
        }
        if (req.body.image) {
            if (Array.isArray(req.body.image)) { // 이미지를 여러개 올리면 image: [img1.png, img2.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                await post.addImages(images)
            } else {  //  이미지를 하나만 올리면 image: img.png
                const image = await  Image.create({ src: req.body.image });
                await post.addImages(image)
            }
        }
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User, // 게시글 작성자
                attributes: ['id', 'nickname']
            }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(201).json(fullPost);
    } catch (e) {
        console.error(e)
        next(e)
    }
});




router.post('/images', isLoggedIn, upload.array('image'), async (req, res ,next) => {  // 이미지 업로드
    //  upload.single('image'), upload.none()
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
});


router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if (!post) {
            return res.status(403).send('존재하지 않는 게시글입니다.')
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            }]
        })

        res.status(201).json(fullComment);
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // 좋아요 추가
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id })
    } catch (e) {
        console.error(e);
        next(e)
    }
})

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // 좋아요 감소
    try {
        const post = await Post.findOne({
            where: { id: req.params.postId }
        });
        if (!post) {
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({ PostId: post.id, UserId: req.user.id })
    } catch (e) {
        console.error(e);
        next(e)
    }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id
            }
        });
        res.status(200).json({ PostId: parseInt(req.params.postId , 10) })
    } catch (e) {
        console.error(e);
        next(e)
    }
});

module.exports = router;