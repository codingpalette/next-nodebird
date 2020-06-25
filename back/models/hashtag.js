module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { // MySQL 에는 users 테이블 생성
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글저장, 이모티콘
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post);
    };
    return Hashtag
}