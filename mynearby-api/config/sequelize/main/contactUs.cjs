//user model
module.exports = function (sequelize, DataTypes) {
	const Contact = sequelize.define('Contact', {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
		full_name: { type: DataTypes.STRING, allowNull: false },
		user_email: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING, allowNull: false },
		message: { type: DataTypes.STRING, allowNull: false },
		created_at: {
			type: 'DATETIME',
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'mt_contact_us',
		classMethods: {
			associate: function (models) {
				//relations
				//User.hasMany(models.Transaction, { foreignKey: 'user_id' });
			}
		}
	});
	return Contact;
};