const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 定义模型
// 使用node src/model/user.model.js创建表
const User = seq.define('sys_user', {
    // id会被sequelize自动创建，管理
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否是管理员，0：不是管理员，1：是管理员'
    }
}, {
    tableName: 'sys_user'
});
// 创建数据表
// User.sync()

module.exports = User