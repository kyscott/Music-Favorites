var Artist = require("./Artist.js");

module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		firstname: {
			type: Sequelize.STRING,notEmpty: true
		},
		lastname: {
			type: Sequelize.STRING,notEmpty: true
		},
		email: {
			type:Sequelize.STRING,
			unique: true,
			lowercase: true,
			validate: {isEmail:true}
		},
		password : {
			type: Sequelize.STRING,
			allowNull: false
		},
		last_login: {
			type: Sequelize.DATE
		}
	});

	return User;

}
