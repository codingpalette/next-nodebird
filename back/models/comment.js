module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { // MySQL 에는 users 테이블 생성
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글저장, 이모티콘
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment
}