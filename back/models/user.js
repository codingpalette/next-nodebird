module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL 에는 users 테이블 생성
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post); // 내가 작성한 포스트들
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 좋아요를 누른 포스트들
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        // 상대방이 나를 팔로워,
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
        // 내가 상대방을 팔로잉, 내가 상대방을 찾을 때 우선 나를 먼저 찾고 그 다음 상대방을 찾기 위해 foreignKey 에  FollowerId(내 아이디) 가 들어간다.
    };
    return User
}