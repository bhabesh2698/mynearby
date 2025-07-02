//user model
module.exports = function (sequelize, DataTypes) {
	const Cms = sequelize.define('Cms', {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
		// uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: true},
		label: { type: DataTypes.STRING, allowNull: false },
		markdown: { type: DataTypes.STRING, allowNull: true },
		updated_at: {
			type: 'DATETIME',
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
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
		tableName: 'mt_cms',
		classMethods: {
			associate: function (models) {
				//relations
				//User.hasMany(models.Transaction, { foreignKey: 'user_id' });
			}
		}
	});
	return Cms;
};