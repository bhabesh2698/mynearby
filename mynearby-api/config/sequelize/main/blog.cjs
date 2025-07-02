//program model
module.exports = function (sequelize, DataTypes) {
	const Blog = sequelize.define('Blog', {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
		tittle: { type: DataTypes.STRING, allowNull: true },
		description: { type: DataTypes.STRING, allowNull: true },
		category: { type: DataTypes.STRING, allowNull: true },
		long_description: { type: DataTypes.STRING, allowNull: true },
		short_url: { type: DataTypes.STRING, allowNull: true },
		image: { type: DataTypes.STRING, allowNull: true },
		is_active: { type: DataTypes.ENUM('Y','N'), allowNull: false, defaultValue: 'N' },
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
		tableName: 'mt_blog',
		classMethods: {
			associate: function (models) {
				//relations
				//User.hasMany(models.Transaction, { foreignKey: 'user_id' });
			}
		}
	});
	return Blog;
};