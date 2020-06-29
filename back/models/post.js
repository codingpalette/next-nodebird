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
        db.Post.belongsTo(db.User);  // 포스트의 작성자
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 포스트에 좋아요 누른 사람들
        db.Post.belongsTo(db.Post, { as: 'Retweet' })
    };
    return Post
}