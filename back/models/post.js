module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { // MySQL 에는 users 테이블 생성
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글저장, 이모티콘
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);  // 포스트의 작성자 post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // post.addHashtags
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 포스트에 좋아요 누른 사람들 post.addLikers, post.removeLikers
        db.Post.belongsTo(db.Post, { as: 'Retweet' }) // post.addRetweet
    };
    return Post
}