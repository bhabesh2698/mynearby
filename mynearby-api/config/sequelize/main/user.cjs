//user model
module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
		uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: true},
		first_name: { type: DataTypes.STRING, allowNull: false },
		last_name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		password_hash: { type: DataTypes.STRING, allowNull: false },
		salt: { type: DataTypes.STRING, allowNull: false },
		phone: { type: DataTypes.STRING, allowNull: false },
		image: { type: DataTypes.STRING, allowNull: true },
		account_type: { type: DataTypes.ENUM('A','U'), allowNull: false, defaultValue: 'U' },
		updated_at: {
			type: 'DATETIME',
			allowNull: true
		},
		created_at: {
			type: 'DATETIME',
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'mt_users',
		classMethods: {
			associate: function (models) {
				//relations
				//User.hasMany(models.Transaction, { foreignKey: 'user_id' });
			}
		}
	});
	return User;
};