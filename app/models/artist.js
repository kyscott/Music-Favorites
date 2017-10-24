module.exports = function(sequelize, Sequelize) {

	var Artist = sequelize.define('artist', {
		artistId: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		artistName: {
			type: Sequelize.STRING,notEmpty: true
		}
	});

	return Artist;

}
