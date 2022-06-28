const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports = (sequelize, DataTypes) => {
  const Candidat = sequelize.define(
    'Candidat',
    {
        idCandidat: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pseudo: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          nom:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          prenom:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          civilite:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          date_de_naissance:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          lieu_de_naissance:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          gouvernorat:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          adresse:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          telephone:{
            type : DataTypes.STRING,
            allowNull: false,
          },   
          email:{
            type : DataTypes.STRING,
            allowNull: false,
          }, 
          post:{
            type : DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique(value, next) {
                  let ID = this.getID()
                  User.findOne({
                    where: [
                      { email: value },
                      { idUser: { [Op.ne]: ID } }
                    ]
                  }).done((user) => {
                    if (user) {
                      return next(new Error("L'adresse E-mail est déjà utilisée"))
                    }
                    next()
                  })
                },
                isEmail: true
              }
          },
          niveau_etude:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          niveau_professionnel:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          experience:{
            type : DataTypes.STRING,
            allowNull: false,
          },
          CV:{
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
            tableName: 'Candidat'
        }
  )      
  Candidat.associate = function () {}

  return Candidat
}