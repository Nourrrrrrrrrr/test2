const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      pseudo: {
        type: DataTypes.String,
        validate: {
          isUnique(value, next) {
            let ID = this.getID()
            User.findOne({
              where: [
                { pseudo: value },
                { idUser: { [Op.ne]: ID } }
              ]
            }).done((user) => {
              if (user) {
                return next(new Error("Le pseudo est déjà utilisé"))
              }
              next()
            })
          },
          isEmail: true
        }
      },
      password:{
        type : DataTypes.STRING,
        allowNull: false,
      }, 
      role:{
        type : DataTypes.STRING,
        allowNull: false,
      }, 
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      },
    },
    {
      timestamps: true,
      tableName: 'User'
    }
  )
  
  User.associate = function () {
  }

  return User
}
